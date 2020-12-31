import { pullBandcampData } from '..';

/** The main goal with tests here is to just make sure that the correct data is still being returned */
describe('pullBandcampData', () => {
  it('still works with an existing account', async () => {
    const expected = {
      website_url: '',
      location: 'Austin, Texas',
      photo: { image_id: 20301968, width: 120, height: 120 },
      fan_id: 4335879,
      following_fans_count: 1,
      username: 'papa_lasagna',
      trackpipe_url: 'https://bandcamp.com/papa_lasagna',
      subscriptions_count: 0,
      followers_count: 1,
      fav_genre: 'Electronic',
      is_own_page: null,
      raw_location: 'Austin',
      following_genres_count: 10,
      following_bands_count: 76,
      name: 'papa_lasagna',
      bio: "Big time synth fan who's slowly starting to fill out other genres",
    };
    const received = await pullBandcampData('papa_lasagna');

    expect(received).toEqual(expected);
  });

  it('handles bad usernames gracefully', async () => {
    // Common mistake, misspelling
    const received = await pullBandcampData('papa_lasagana');

    expect(received).toEqual(undefined);
  });
});
