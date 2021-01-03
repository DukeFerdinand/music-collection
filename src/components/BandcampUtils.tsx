import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BandcampServices, BCServiceStatus } from '../api/bandcamp';

export const BandcampUtils: React.FC = () => {
  const bcService = new BandcampServices();
  // true -> OK, false -> NO ACCESS, null -> NOT CHECKED
  const [scraperStatus, setScraperStatus] = useState<BCServiceStatus>(
    BCServiceStatus.Unknown,
  );
  // Pinging the scraper on page load does two things:
  // - makes sure it's online
  // - "spins up" the express function so the scrape method doesn't take near as long
  useEffect(() => {
    const asyncEffect = async () => {
      // Only run on page load as scraper status will be NULL vs false
      if (scraperStatus === BCServiceStatus.Unknown) {
        const status = await bcService.bandcampHealthCheck();
        setScraperStatus(status);
      }
    };

    asyncEffect();
  }, [scraperStatus, setScraperStatus]);
  return (
    <div className="dark:text-white">
      <h1 className="text-3xl">Bandcamp Source Tools</h1>
      <Link className="text-blue-400 hover:text-blue-500" to="/">
        Home
      </Link>

      {/* Utilities */}
      <div className="flex flex-col py-5">
        <h2 className="text-2xl mb-5">Available Services</h2>
        {scraperStatus === BCServiceStatus.Unknown ? (
          'Checking service status...'
        ) : (
          <BandcampUtilsScraper status={scraperStatus} />
        )}
      </div>
    </div>
  );
};

interface BandcampUtilsScraperProps {
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

const BandcampUtilsScraper: React.FC<BandcampUtilsScraperProps> = (props) => {
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
      <Formik
        initialValues={{
          'bc-username': '',
        }}
        onSubmit={(vals) => {
          if (vals['bc-username'] !== '') {
            console.info('[Get BC Data]');
          }
        }}
      >
        <Form className="flex flex-col md:flex-row items-center">
          <label className="mb-2 md:mb-0 md:mr-5" htmlFor="bc-username">
            Your Bandcamp Username
          </label>
          <Field
            type="text"
            className="p-2 rounded-md text-gray-900 mb-4 md:mb-0 md:mr-5"
            name="bc-username"
            placeholder="Bandcamp Username"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-md dark:bg-green-500"
          >
            Get Data
          </button>
        </Form>
      </Formik>
    </div>
  );
};
