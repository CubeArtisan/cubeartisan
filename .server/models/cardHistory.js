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

const Datapoint = {
  elo: Number,
  rating: Number,
  picks: Number,
  cubes: Number,
  prices: [
    {
      version: String,
      price: Number,
      price_foil: Number,
      eur: Number,
      tix: Number,
    },
  ],
  size180: [Number],
  size360: [Number],
  size450: [Number],
  size540: [Number],
  size720: [Number],
  pauper: [Number],
  peasant: [Number],
  legacy: [Number],
  modern: [Number],
  standard: [Number],
  vintage: [Number],
  total: [Number],
};

// card schema for analytics only. Use card objects for most use cases
const cardHistorySchema = mongoose.Schema({
  // Normal card name, not lowercased.
  cardName: String,
  oracleId: {
    type: String,
    unique: true,
  },
  versions: [String], // Card IDs for all versions of this card.
  current: Datapoint,
  cubedWith: {
    // Oracle ID
    synergistic: [String],
    top: [String],
    creatures: [String],
    spells: [String],
    other: [String],
  },
  history: {
    type: [
      {
        date: String,
        data: Datapoint,
      },
    ],
    default: [],
  },
});

const CardHistory = mongoose.model('CardHistory', cardHistorySchema);

export default CardHistory;
