// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import updatedb from '@cubeartisan/server/serverjs/updatecards.js';
import CardRating from '@cubeartisan/server/models/cardrating.js';
import CardHistory from '@cubeartisan/server/models/cardHistory.js';

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
