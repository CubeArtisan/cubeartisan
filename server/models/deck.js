/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import mongoose from 'mongoose';
import cardSchema from '@hypercube/server/models/shared/cardSchema';

const CURRENT_SCHEMA_VERSION = require('./migrations/deckMigrations').slice(-1)[0].version;

// data for each seat, human or bot
const SeatDeck = {
  bot: [String], // null bot value means human player
  userid: String,
  username: String,
  name: String,
  description: {
    type: String,
    default: 'No description available.',
  },
  deck: [[[Number]]], // nesting is rows->columns->index in column
  sideboard: [[[Number]]], // same as deck.
  pickorder: [Number],
};

// Deck schema
const deckSchema = mongoose.Schema(
  {
    cube: String,
    cubeOwner: String,
    owner: String,
    date: Date,
    draft: {
      type: String,
      default: '',
    },
    cubename: {
      type: String,
      default: 'Cube',
    },
    seats: {
      type: [SeatDeck],
      default: [],
    },
    cards: [cardSchema],
    schemaVersion: {
      type: Number,
      default() {
        if (this.isNew) {
          return CURRENT_SCHEMA_VERSION;
        }
        return void 0; // eslint-disable-line
      },
    },
    basics: [Number],
  },
  { timestamps: true },
);

deckSchema.index({
  cubeOwner: 1,
  date: -1,
});

deckSchema.index({
  date: -1,
});

deckSchema.index({
  cube: 1,
  date: -1,
});

deckSchema.index({
  owner: 1,
  date: -1,
});

deckSchema.index({
  schemaVersion: 1,
});

deckSchema.index({
  draft: 1,
});

deckSchema.pre('save', async () => {
  this.schemaVersion = CURRENT_SCHEMA_VERSION;
});

const Deck = mongoose.model('Deck', deckSchema);
Deck.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;

export default Deck;
