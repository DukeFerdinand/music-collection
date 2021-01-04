import express, { Request, Response } from 'express';
import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import cors from 'cors';

import { RequestBody, pullBandcampData } from './utils';

/**
 * The actual route handler for this tiny application
 *
 * This route handler mostly acts as a validator for the
 *
 */
export const routeHandler: HttpFunction = async (
  req: Request<unknown, unknown, RequestBody, RequestBody>,
  res: Response,
) => {
  console.log('[ Bandcamp User Scraper ]');
  const userSlug = req.body.userSlug;

  if (!userSlug) {
    return res.status(400).json({
      message: 'Please add userSlug to either POST body or GET query',
    });
  }
  try {
    console.log(
      '[ Bandcamp User Scraper ] - Spinning up headless browser instance...',
    );
    const userData = await pullBandcampData(userSlug);
    console.log('[ Bandcamp User Scraper ] - Done, checking results...');

    if (!userData) {
      console.log('[ Bandcamp User Scraper ] - Bad user slug');
      return res.status(404).json({
        message: `Unable to retrieve user data for slug ${userSlug}`,
      });
    }

    console.log('[ Bandcamp User Scraper ] - Data okay! Scrape successful.');
    return res.status(200).json({
      ...userData,
    });
  } catch (e) {
    console.log('[ Bandcamp User Scraper ] - 500 Error, check logs');
    return res.status(500).send({
      message: e.message || 'Something went wrong',
    });
  }
};

const app = express();

// Pre-process request body and expose to `req.body`
app.use(express.json());

// CORS settings
// TODO: Lock this down to only allow on domains I control
app.use(cors());

app.post('/', routeHandler);

app.get('/', (req, res) => {
  console.log('[ Bandcamp Scraper ] => Health Check');
  res.json({
    message: 'Bandcamp scraper online',
  });
});

app.listen(8080, '0.0.0.0', () => {
  console.info('[ Bandcamp Scraper ] Listening on *:8081');
});
