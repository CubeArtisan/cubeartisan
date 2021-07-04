// Load Environment Variables
import mongoose from 'mongoose';
import { winston } from './serverjs/cloudwatch';
import updatedb from './serverjs/updatecards';
import CardRating from './models/cardrating';
import CardHistory from './models/cardHistory';

require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    let ratings = [];
    let histories = [];
    if (process.env.USE_S3 !== 'true') {
      ratings = await CardRating.find({}, 'name elo embedding').lean();
      histories = await CardHistory.find({}, 'oracleId current.total current.picks').lean();
    }
    await updatedb.updateCardbase(ratings, histories);
  } catch (error) {
    winston.error(error, { error });
  }

  process.exit();
})();
