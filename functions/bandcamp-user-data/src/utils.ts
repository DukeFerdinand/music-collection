import playwright from 'playwright';

export interface RequestBody {
  // Not actually optional, just forces a check to add a "?"
  userSlug?: string;
}

export interface RawBandcampUserData {
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

/**
 * ## pullBandcampData
 *
 * This is the money function, and replaces the traditional "db call"
 *
 * Here we take in the username and effectively render out the whole
 * bandcamp website just to pull the `window.FanData` key for a user.
 *
 * If bandcamp offered an API like Discogs we wouldn't have to sneak
 * around like this, but at least I discovered the window trick :)
 *
 * ### Usage:
 * ```ts
 * // Inside async function...
 * const userData = await pullBandcampData(userSlug)
 * // Undefined data means that there was likely a 404 in the bandcamp render - username likely bad
 * if (!userData) return new Error('Could not get data for user!')
 * else //data is good, use as needed
 * ```
 */
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
