// Load Environment Variables
import mongoose from 'mongoose';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import updatedb from '@cubeartisan/server/serverjs/updatecards.js';
import CardRating from '@cubeartisan/server/models/cardrating.js';
import CardHistory from '@cubeartisan/server/models/cardHistory.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

(async () => {
  try {
    await connectionQ();
    let ratings = [];
    let histories = [];
    if (process.env.USE_S3 !== 'true') {
      ratings = await CardRating.find({}, 'name elo embedding').lean();
      histories = await CardHistory.find({}, 'oracleId current.total current.picks').lean();
    }
    await updatedb.updateCardbase(ratings, histories);
    await mongoose.disconnect();
  } catch (error) {
    winston.error(error, { error });
    process.exit(1);
  }

  process.exit();
})();
