import { RawBandcampUserData } from '../../structures/bandcamp';

interface Props {
  bcUserData: Pick<
    RawBandcampUserData,
    'name' | 'following_bands_count' | 'location' | 'fan_id' | 'photo'
  >;
}

export const BCUserCard: React.FC<Props> = ({ bcUserData }) => {
  return (
    <div className="h-28 rounded-md shadow-sm mt-5 p-2 flex items-center bg-white text-gray-900">
      <img
        className="rounded-md h-full"
        src={`https://f4.bcbits.com/img/${bcUserData.photo.image_id}_41.jpg`}
        alt={bcUserData.name}
      />
      <div className="flex flex-row rounded-md flex-1 bg-gray-400 bg-opacity-25 h-full my-3 ml-10 mr-2 px-4 py-2">
        <div className="flex flex-col">
          <h3 className="text-xl">{bcUserData.name}</h3>
          <p>{bcUserData.location}</p>
        </div>

        <div className="flex text-sm">
          <p className="mr-2">Following:</p>
          <p>{bcUserData.following_bands_count}</p>
        </div>
      </div>
    </div>
  );
};
