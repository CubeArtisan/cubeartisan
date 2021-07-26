// Load Environment Variables
import mongoose from 'mongoose';
import Deck from '@cubeartisan/server/models/deck.js';
import Cube from '@cubeartisan/server/models/cube.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

const batchSize = 100;
const skip = 120300;

const ownerCache = {};

async function addVars(deck) {
  try {
    if (!ownerCache[deck.cube]) {
      const cube = await Cube.findById(deck.cube);
      if (cube) {
        ownerCache[deck.cube] = cube.owner;
      }
    }
    deck.cubeOwner = ownerCache[deck.cube];
    deck.owner = deck.seats[0].userid;

    return deck.save();
  } catch (err) {
    return console.error(err);
  }
}

(async () => {
  await connectionQ();
  const count = await Deck.countDocuments();
  const cursor = Deck.find().skip(skip).cursor();
  // batch them by batchSize
  for (let i = 0; i < count - skip; i += batchSize) {
    const decks = [];
    for (let j = 0; j < batchSize; j++) {
      if (i + j < count - skip) {
        const deck = await cursor.next();
        if (deck) {
          decks.push(deck);
        }
      }
    }
    await Promise.all(decks.map((deck) => addVars(deck)));
    console.log(`Finished: ${i} of ${count - skip} decks`);
  }
  await mongoose.disconnect();
  console.log('done');
})();
