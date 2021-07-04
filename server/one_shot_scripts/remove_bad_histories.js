// Load Environment Variables
import mongoose from 'mongoose';
import CardHistory from '../models/cardHistory';

require('dotenv').config();

(async () => {
  mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const res = await CardHistory.deleteMany({ history: { $size: 1 } }).lean();

    console.log(res);

    console.log('done');
    process.exit();
  });
})();
