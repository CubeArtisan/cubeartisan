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
const blogSchema = mongoose.Schema({
  title: String,
  body: String,
  owner: String,
  date: Date,
  cube: String,
  markdown: String,
  dev: String,
  date_formatted: String,
  username: {
    type: String,
    default: 'User',
  },
  cubename: {
    type: String,
    default: 'Cube',
  },
});

blogSchema.index({
  cube: 1,
  date: -1,
});

blogSchema.index({
  owner: 1,
  date: -1,
});

blogSchema.index({
  cube: 1,
  date: -1,
});

blogSchema.index({
  dev: 1,
  date: -1,
});

blogSchema.index({
  cube: 1,
  owner: 1,
  dev: 1,
  date: -1,
});

export default mongoose.model('Blog', blogSchema);
