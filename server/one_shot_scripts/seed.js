// Load Environment Variables
import seeder from 'mongoose-seed';

require('dotenv').config();

const blogs = require(`server/seeds/blogs.json`);
const cardratings = require(`server/seeds/cardratings.json`);
const cubes = require(`server/seeds/cubes.json`);
const decks = require(`server/seeds/decks.json`);
const drafts = require(`server/seeds/drafts.json`);
const users = require(`server/seeds/users.json`);

// Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'User',
    documents: users,
  },
  {
    model: 'Blog',
    documents: blogs,
  },
  {
    model: 'CardRating',
    documents: cardratings,
  },
  {
    model: 'Cube',
    documents: cubes,
  },
  {
    model: 'Deck',
    documents: decks,
  },
  {
    model: 'Draft',
    documents: drafts,
  },
];

seeder.connect(process.env.MONGODB_URL, () => {
  // Load Mongoose models
  const modelPath = 'models/';
  seeder.loadModels([
    `${modelPath}blog.js`,
    `${modelPath}cardrating.js`,
    `${modelPath}cube.js`,
    `${modelPath}deck.js`,
    `${modelPath}draft.js`,
    `${modelPath}user.js`,
  ]);

  // Populate databases, then close seeder
  seeder.populateModels(data, () => {
    seeder.disconnect();
  });
});
