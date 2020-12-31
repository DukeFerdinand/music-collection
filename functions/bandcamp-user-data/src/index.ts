import { Request, Response } from 'express';
import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

import playwright from 'playwright';

interface RequestBody {
  // Not actually optional, just forces a check to add a "?"
  userSlug?: string;
}

interface RawBandcampUserData {
  name: string;
  following_genres_count: number;
  is_own_page: boolean | null;
  subscriptions_count: number;
  following_fans_count: number;
  raw_location: string;
  location: string;
  fav_genre: string;
  photo: { image_id: number; width: 120; height: 120 };
  following_bands_count: number;
  trackpipe_url: string;
  website_url: string;
  followers_count: number;
  bio: string;

  // Important
  username: string;
  fan_id: number;
}

export const pullBandcampData = async (
  userSlug: RawBandcampUserData['username'],
): Promise<RawBandcampUserData | undefined> => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Bandcamp profile page
  await page.goto(`https://bandcamp.com/${userSlug}`);

  // Hasn't been undefined in any of my tests, but forcing an undefined check isn't out of place
  const userData = await page.evaluate<RawBandcampUserData | undefined>(
    'window.FanData',
  );
  browser.close();

  return userData;
};

export const routeHandler: HttpFunction = async (
  req: Request<unknown, unknown, RequestBody, RequestBody>,
  res: Response,
) => {
  console.info(req.query);
  // For supporting GET and POST requests
  const userSlug = req.body.userSlug || req.query.userSlug;

  if (!userSlug) {
    return res.status(400).json({
      message: 'Please add userSlug to either POST body or GET query',
    });
  }

  const userData = await pullBandcampData(userSlug);

  if (!userData) {
    return res.status(404).json({
      message: `Unable to retrieve user data for slug ${userSlug}`,
    });
  }

  return res.status(200).json({
    data: userData,
  });
};
