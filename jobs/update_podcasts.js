// Load Environment Variables
import mongoose from 'mongoose';
import { updatePodcast } from '../serverjs/podcast';
import Podcast from '../models/podcast';
import { winston } from '../serverjs/cloudwatch';

require('dotenv').config();

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
