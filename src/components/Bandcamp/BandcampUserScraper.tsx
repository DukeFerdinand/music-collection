import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BandcampServices, BCServiceStatus } from '../../api/bandcamp';
import { RawBandcampUserData } from '../../structures/bandcamp';
import { BCUserScraperForm } from './BCUserScraperForm';
import { BCUserCard } from './BCUserCard';

interface BandcampUserScraperProps {
  status: BCServiceStatus;
}

// const BandcampApiDescription: React.FC = () => {
//   return (
//     <p>
//       Bandcamp doesn&apos;t provide a publicly accessible API, so I&apos;m using
//       some workarounds I&apos;ve found to pull user data. Because there
//       isn&apos;t an easy way to add <i>true</i> authentication (like an OAuth
//       API), I will NOT implement, or try to implement, any data updates. So this
//       is all just publicly accessible collection data. <br className="mb-5" />{' '}
//       See the [tech explanation page] for more detail
//     </p>
//   );
// };

// const BandcampUsernameGuide: React.FC = () => (
//   <div className="w-full lg:w-1/2">
//     <p className="text-lg mb-2">How do I get my Bandcamp username?</p>
//     <p className="mb-5">
//       With bandcamp, you have a{' '}
//       <code className="dark:bg-blue-50 dark:text-gray-700 rounded-md mx-1 py-1 px-2">
//         name
//       </code>{' '}
//       and a{' '}
//       <code className="dark:bg-blue-50 dark:text-gray-700 rounded-md mx-1 py-1 px-2">
//         username
//       </code>{' '}
//       key. To get the <i>username</i> for your account, visit your profile, and
//       copy the portion of the url below highlighted in green:
//     </p>

//     <pre className="dark:bg-blue-50 dark:text-gray-500 rounded-md mb-5 py-1 px-2">
//       {'https://bandcamp.com/'}
//       <span className="text-green-400">{'<your_username>'}</span>
//     </pre>
//   </div>
// );

export const BandcampUserScraper: React.FC<BandcampUserScraperProps> = (
  props,
) => {
  const bcServices = new BandcampServices();
  const [bcUserData, setBcUserData] = useState<RawBandcampUserData | null>(
    null,
  );

  if (props.status !== BCServiceStatus.Ok) {
    return (
      <div className="w-full xl:w-1/2 p-5 rounded-md shadow-sm border dark:border-gray-900 dark:bg-gray-900">
        Bandcamp user integration offline :(
      </div>
    );
  }
  return (
    <div className="w-full xl:w-1/2 p-5 rounded-md shadow-sm border dark:border-gray-900 dark:bg-gray-900">
      <div className="flex flex-row items-center justify-between mb-5">
        <h3 className="text-xl">Link Bandcamp User Data</h3>
        <div className="flex">
          <Link className="flex items-center" to="/technical?section=bandcamp">
            <span className="mr-2 hidden sm:block">Technical Note</span>
            <i className="material-icons text-base">info</i>
          </Link>
        </div>
      </div>
      <BCUserScraperForm
        onSubmit={async (userSlug) => {
          const res = await bcServices.getBandcampInfo(userSlug);

          if (res.isOk()) {
            setBcUserData(res.unwrap());
            return true;
          }

          console.error(res.unwrapErr());
          return false;
        }}
      />
      {bcUserData && <BCUserCard bcUserData={bcUserData} />}
    </div>
  );
};
