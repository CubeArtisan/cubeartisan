// Load Environment Variables
// node one_shot_scripts/import_ratings.js ../ratings.json
import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import CardRating from '@cubeartisan/server/models/cardrating.js';

dotenv.config();

async function saveCardRating(cardRating) {
  const existing = (await CardRating.findOne({ name: cardRating.name })) || new CardRating();
  existing.name = cardRating.name;
  existing.elo = cardRating.elo;
  existing.picks = cardRating.picks;
  existing.value = cardRating.value;
  await existing.save();
  return existing;
}

async function saveRatings(defaultPath) {
  const ratings = JSON.parse(fs.readFileSync(defaultPath));
  return Promise.all(ratings.map(saveCardRating));
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  await saveRatings(process.argv[2]);
  await mongoose.disconnect();
  console.log('done');
  process.exit();
})();
