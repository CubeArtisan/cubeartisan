// Load Environment Variables
import mongoose from 'mongoose';
import CardRating from '../models/cardrating';

require('dotenv').config();

(async () => {
  mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const res = await CardRating.deleteMany({ name: null });

    console.log(res);

    console.log('done');
    process.exit();
  });
})();
