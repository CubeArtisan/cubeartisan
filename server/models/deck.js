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
import cardSchema from '@cubeartisan/server/models/shared/cardSchema.js';
// import migrations from '@cubeartisan/server/models/migrations/deckMigrations.js';

// const CURRENT_SCHEMA_VERSION = migrations.slice(-1)[0].version;

// data for each seat, human or bot
const SeatDeck = {
  bot: [String], // null bot value means human player
  userid: mongoose.Schema.Types.ObjectId,
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

const deckSchema = mongoose.Schema(
  {
    cube: mongoose.Schema.Types.ObjectId,
    cubeOwner: mongoose.Schema.Types.ObjectId,
    owner: mongoose.Schema.Types.ObjectId,
    date: Date,
    draft: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
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
    //   default() {
    //     if (this.isNew) {
    //       return CURRENT_SCHEMA_VERSION;
    //     }
    //     return void 0; // eslint-disable-line
    //   },
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
//
// deckSchema.pre('save', function saveDeckSchemaVersion(next) {
//   this.schemaVersion = CURRENT_SCHEMA_VERSION;
//   next();
// });

const Deck = mongoose.model('Deck', deckSchema);
// Deck.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;

export default Deck;
