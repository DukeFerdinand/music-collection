import { RequestMethods, smartFetch } from '@dukeferdinand/ts-utils/dist/fetch';

export enum BCServiceStatus {
  Unknown,
  Ok,
  Error,
}

const BandcampServiceRoutes = {
  healthCheck: {
    route: process.env.REACT_APP_BANDCAMP_SCRAPER,
    method: RequestMethods.GET,
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

  // public getBandcampInfo(username: '');
}
