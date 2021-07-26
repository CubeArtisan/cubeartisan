// Load Environment Variables
import mongoose from 'mongoose';
import Deck from '@cubeartisan/server/models/deck.js';
import Cube from '@cubeartisan/server/models/cube.js';
import User from '@cubeartisan/server/models/user.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection';

const batchSize = 100;

const cubeNameCache = {};
const userNameCache = {};

async function addVars(deck) {
  if (!cubeNameCache[deck.cube]) {
    const cube = await Cube.findById(deck.cube);
    cubeNameCache[deck.cube] = cube ? cube.name : 'Cube';
  }
  deck.cubename = cubeNameCache[deck.cube];

  if (!userNameCache[deck.owner]) {
    const user = await User.findById(deck.owner);
    userNameCache[deck.owner] = user ? user.username : 'User';
  }
  deck.username = userNameCache[deck.owner];

  return deck.save();
}

(async () => {
  await connectionQ;
  const count = await Deck.countDocuments();
  const cursor = Deck.find().cursor();

  // batch them by batchSize
  for (let i = 0; i < count; i += batchSize) {
    const decks = [];
    for (let j = 0; j < batchSize; j++) {
      if (i + j < count) {
        // eslint-disable-next-line no-await-in-loop
        const deck = await cursor.next();
        if (deck) {
          decks.push(deck);
        }
      }
    }
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(decks.map((deck) => addVars(deck)));
    console.log(`Finished: ${i} of ${count} decks`);
  }
  await mongoose.disconnect();
  console.log('done');
})();
