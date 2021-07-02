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

// Deck schema
const commentSchema = mongoose.Schema({
  parent: String,
  parentType: {
    type: String,
    enum: ['comment', 'blog', 'deck', 'card', 'article', 'podcast', 'video', 'episode', 'package'],
  },
  owner: String,
  ownerName: String,
  content: String,
  timePosted: Date,
  updated: Boolean,
  image: {
    type: String,
    default: 'https://img.scryfall.com/cards/art_crop/front/0/c/0c082aa8-bf7f-47f2-baf8-43ad253fd7d7.jpg?1562826021',
  },
  artist: {
    type: String,
    default: 'Allan Pollack',
  },
  date: Date,
});

commentSchema.index({
  parent: 1,
  date: 1,
});

commentSchema.index({
  timePosted: -1,
});

export default mongoose.model('Comment', commentSchema);
