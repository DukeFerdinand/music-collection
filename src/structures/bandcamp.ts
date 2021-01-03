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
