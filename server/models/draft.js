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
import stepsSchema from '@cubeartisan/server/models/shared/stepsSchema.js';
import migrations from '@cubeartisan/server/models/migrations/draftMigrations.js';

const CURRENT_SCHEMA_VERSION = migrations.slice(-1)[0].version;

// Details on each pack, how to draft and what's in it.
const Pack = {
  cards: {
    type: [
      {
        type: Number,
        min: 0,
      },
    ],
    default() {
      if (this.isNew) {
        return [];
      }
      return void 0; // eslint-disable-line
    },
  },
  steps: {
    type: stepsSchema,
    default() {
      if (this.isNew) {
        return null;
      }
      return void 0; // eslint-disable-line
    },
  },
};

// // data for each seat, human or bot
const Seat = {
  bot: Boolean, // null bot value means human player
  name: String,
  userid: String,
  drafted: [[[Number]]], // organized draft picks
  sideboard: [[[Number]]], // organized draft picks
  pickorder: [Number], // cards this player picked in order of when they were picked
  trashorder: [Number], // cards this player trashed in order of when they were trashed
};

// Cube schema
const draftSchema = mongoose.Schema(
  {
    basics: {
      default: [],
      type: [Number],
    },
    cards: [cardSchema],
    cube: String,
    initial_state: [[Pack]],
    schemaVersion: {
      type: Number,
      default() {
        if (this.isNew) {
          return CURRENT_SCHEMA_VERSION;
        }
        return void 0; // eslint-disable-line
      },
    },
    seats: [Seat],
    seed: String,
  },
  { timestamps: true },
);

draftSchema.index({
  schemaVersion: 1,
});

draftSchema.pre('save', () => {
  this.schemaVersion = CURRENT_SCHEMA_VERSION;
});

const Draft = mongoose.model('Draft', draftSchema);
Draft.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;

export default Draft;
