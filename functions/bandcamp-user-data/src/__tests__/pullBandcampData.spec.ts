import { pullBandcampData, RawBandcampUserData } from '..';

/** The main goal with tests here is to just make sure that the correct data is still being returned */
describe('pullBandcampData', () => {
  it('still works with an existing account', async () => {
    const expectedData: Partial<RawBandcampUserData> = {
      username: process.env.BC_TEST_USER,
      fan_id: parseInt(process.env.BC_TEST_ID as string),
    };
    const received = await pullBandcampData(expectedData.username as string);

    expect(received?.username).toEqual(expectedData.username);
    expect(received?.fan_id).toEqual(expectedData.fan_id);
  });

  it('handles bad usernames gracefully', async () => {
    // Common mistake, misspelling
    const received = await pullBandcampData('papa_lasagana');

    expect(received).toEqual(undefined);
  });
});
