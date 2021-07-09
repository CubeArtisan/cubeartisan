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
import migrations from '@cubeartisan/server/models/migrations/gridDraftMigrations.js';

const CURRENT_SCHEMA_VERSION = migrations.slice(-1)[0].version;

// data for each seat, human or bot
const Seat = {
  bot: Boolean,
  name: String,
  userid: String,
  drafted: [[[Number]]], // organized draft picks
  sideboard: [[[Number]]], // organized draft picks
  pickorder: [Number],
  pickedIndices: [Number],
};

// Cube schema
const gridDraftSchema = mongoose.Schema({
  basics: {
    default: [],
    type: [Number],
  },
  cards: [cardSchema],
  cube: String,
  draftType: {
    type: String,
    enum: ['bot', '2playerlocal'],
  },
  initial_state: [[Number]],
  seats: [Seat],
  schemaVersion: {
    type: Number,
    default() {
      if (this.isNew) {
        return CURRENT_SCHEMA_VERSION;
      }
      return void 0; // eslint-disable-line
    },
  },
});

gridDraftSchema.index({
  schemaVersion: 1,
});

gridDraftSchema.pre('save', () => {
  this.schemaVersion = CURRENT_SCHEMA_VERSION;
});

const GridDraft = mongoose.model('GridDraft', gridDraftSchema);
GridDraft.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;

export default GridDraft;
