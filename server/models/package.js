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

// Blog schema
const packageSchema = mongoose.Schema({
  title: String,
  date: Date,
  userid: String,
  username: String,
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  cards: {
    type: [String],
    default: [],
  },
  votes: {
    type: Number,
    default: 0,
  },
  voters: {
    type: [String],
    default: [],
  },
  keywords: {
    type: [String],
    default: [],
  },
});

packageSchema.index({
  votes: 1,
  date: -1,
});

packageSchema.index({
  approved: 1,
  date: -1,
});

packageSchema.index({
  keywords: 1,
  date: -1,
});

export default mongoose.model('Package', packageSchema);
