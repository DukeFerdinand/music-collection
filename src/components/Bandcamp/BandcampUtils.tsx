import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { BandcampUserScraper } from './BandcampUserScraper';
import { BandcampServices, BCServiceStatus } from '../../api/bandcamp';

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
          <BandcampUserScraper status={scraperStatus} />
        )}
      </div>
    </div>
  );
};
