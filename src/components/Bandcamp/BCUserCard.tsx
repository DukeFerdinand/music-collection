import { RawBandcampUserData } from '../../structures/bandcamp';

interface Props {
  bcUserData: Pick<
    RawBandcampUserData,
    | 'name'
    | 'following_bands_count'
    | 'followers_count'
    | 'location'
    | 'fan_id'
    | 'photo'
  >;
}

export const BCUserCard: React.FC<Props> = ({ bcUserData }) => {
  return (
    <div className="sm:h-28 rounded-md shadow-sm py-2 sm:p-2 flex flex-col sm:flex-row items-center bg-white text-gray-900">
      <img
        className="rounded-md sm:h-full"
        src={`https://f4.bcbits.com/img/${bcUserData.photo.image_id}_41.jpg`}
        alt={bcUserData.name}
      />
      <div className="flex flex-col divide-y divide-x-0 sm:divide-y-0 sm:divide-x divide-gray-400 sm:flex-row items-center sm:rounded-md flex-1 bg-gray-400 bg-opacity-25 w-full sm:w-auto h-full sm:ml-10 sm:mr-2 px-4">
        <div className="flex flex-col mr-5 py-4 sm:py-0">
          <h3 className="text-2xl">{bcUserData.name}</h3>
          <p>{bcUserData.location}</p>
        </div>

        <div className="flex flex-col sm:flex-row flex-grow justify-around items-center text-sm py-5 sm:h-2/3 sm:px-4 sm:mr-5">
          <div className="flex">
            <p className="mr-2">Following:</p>
            <p>{bcUserData.following_bands_count}</p>
          </div>
          <div className="flex">
            <p className="mr-2">Followers:</p>
            <p>{bcUserData.followers_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
