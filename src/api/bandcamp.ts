import { Result } from '@dukeferdinand/ts-results';
import { RequestMethods, smartFetch } from '@dukeferdinand/ts-utils/dist/fetch';

import { RawBandcampUserData } from '../structures/bandcamp';

export enum BCServiceStatus {
  Unknown,
  Ok,
  Error,
}

const BandcampServiceRoutes = {
  healthCheck: {
    method: RequestMethods.GET,
    route: process.env.REACT_APP_BANDCAMP_SCRAPER,
  },
  getInfo: {
    method: RequestMethods.POST,
    route: process.env.REACT_APP_BANDCAMP_SCRAPER,
  },
};

export class BandcampServices {
  public async bandcampHealthCheck(): Promise<BCServiceStatus> {
    const { method, route } = BandcampServiceRoutes.healthCheck;
    if (!route) {
      return BCServiceStatus.Error;
    }

    const res = await smartFetch<{ message: string }, Error>(method, route);

    console.info(res, BandcampServiceRoutes);

    if (res.isOk()) {
      return BCServiceStatus.Ok;
    }

    return BCServiceStatus.Error;
  }

  public getBandcampInfo(
    userSlug: string,
  ): Promise<Result<RawBandcampUserData, Error>> {
    const { method, route } = BandcampServiceRoutes.getInfo;
    if (!route) {
      throw new Error(
        '[getBandcampInfo] Bandcamp Scraper URL not found, aborting...',
      );
    }
    return smartFetch<RawBandcampUserData, Error>(method, route, {
      body: {
        userSlug,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
