// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import winston from '@cubeartisan/server/serverjs/winstonConfig';
import updatedb from '@cubeartisan/server/serverjs/updatecards';
import CardRating from '@cubeartisan/server/models/cardrating';
import CardHistory from '@cubeartisan/server/models/cardHistory';

dotenv.config();

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
