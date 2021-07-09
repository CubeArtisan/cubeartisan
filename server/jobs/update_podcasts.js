// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { updatePodcast } from '@cubeartisan/server/serverjs/podcast.js';
import Podcast from '@cubeartisan/server/models/podcast.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';

dotenv.config();

const tryUpdate = async (podcast) => {
  try {
    await updatePodcast(podcast);
  } catch (err) {
    winston.error(`Failed to update podcast: ${podcast.title}`, { error: err });
  }
};
const run = async () => {
  const podcasts = await Podcast.find({ status: 'published' });
  winston.info({ message: 'Updating podcasts...' });
  await Promise.all(podcasts.map(tryUpdate));
  winston.info({ message: 'Finished updating podcasts.' });
  // this is needed for log group to stream
  await new Promise((resolve) => {
    setTimeout(resolve, 10000);
  });
  process.exit();
};

// Connect db
mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    run();
  });
