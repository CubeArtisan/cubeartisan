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
const podcastEpisodeSchema = mongoose.Schema({
  title: String,
  podcastname: String,
  description: String,
  podcast: String,
  source: String,
  owner: String,
  image: String,
  date: Date,
  guid: String,
  link: String,
  username: {
    type: String,
    default: 'User',
  },
});

podcastEpisodeSchema.index({
  owner: 1,
});

export default mongoose.model('PodcastEpisode', podcastEpisodeSchema);
