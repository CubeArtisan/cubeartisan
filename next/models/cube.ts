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
import { model, models, Schema } from 'mongoose';

import cardSchema from '@cubeartisan/next/models/shared/card';
import stepsSchema from '@cubeartisan/next/models/shared/step';
import type { MongoCube } from '@cubeartisan/next/types/cube';

const cubeSchema = new Schema<MongoCube>({
  name: {
    type: String,
    required: true,
  },
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isListed: {
    type: Boolean,
    default: true,
  },
  privatePrices: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  overrideCategory: {
    type: Boolean,
    default: false,
  },
  categoryOverride: {
    type: String,
    default: 'Vintage',
  },
  categoryPrefixes: [String],
  cards: [cardSchema],
  maybe: [cardSchema],
  tag_colors: [
    {
      tag: String,
      color: String,
    },
  ],
  defaultDraftFormat: {
    type: Number,
    default: -1,
  },
  numDecks: {
    type: Number,
    default: 0,
  },
  description: String,
  image_uri: String,
  image_artist: String,
  image_name: String,
  owner_name: String,
  date_updated: Date,
  updated_string: String,
  default_sorts: [String],
  default_show_unsorted: Boolean,
  card_count: Number,
  type: String,
  draft_formats: [
    {
      title: String,
      multiples: Boolean,
      markdown: String,
      packs: {
        type: [{ slots: [String], steps: stepsSchema }],
      },
      defaultSeats: Number,
    },
  ],
  users_following: [Schema.Types.ObjectId],
  defaultStatus: {
    type: String,
    default: 'Owned',
  },
  defaultPrinting: {
    type: String,
    // Values: first, recent
    default: 'recent',
  },
  disableNotifications: {
    type: Boolean,
    default: false,
  },
  // This can't have a correct value of default so we'll have to rely on the code setting it correctly.
  basics: [String],
  tags: [String],
  cardOracles: [String],
  keywords: [String],
  categories: [String],
});

cubeSchema.index({
  shortID: 1,
});

cubeSchema.index({
  isListed: 1,
  date_updated: -1,
});

cubeSchema.index({
  owner: 1,
  date_updated: -1,
});

cubeSchema.index({
  name: 1,
  date_updated: -1,
});

// these indexes are for explore queries
cubeSchema.index({
  isFeatured: 1,
});

cubeSchema.index({
  isListed: 1,
  card_count: 1,
  date_updated: -1,
});

cubeSchema.index({
  isListed: 1,
  owner: 1,
  numDecks: -1,
});

cubeSchema.index({
  schemaVersion: 1,
});

// these indexes are for searching
cubeSchema.index({
  isListed: 1,
  tags: 1,
  numDecks: -1,
  name: 1,
  date_updated: -1,
  card_count: -1,
});

cubeSchema.index({
  isListed: 1,
  cardOracles: 1,
  numDecks: -1,
  name: 1,
  date_updated: -1,
  card_count: -1,
});

cubeSchema.index({
  isListed: 1,
  keywords: 1,
  numDecks: -1,
  name: 1,
  date_updated: -1,
  card_count: -1,
});

cubeSchema.index({
  isListed: 1,
  categories: 1,
  numDecks: -1,
  name: 1,
  date_updated: -1,
  card_count: -1,
});

const Cube = models.Cube ?? model('Cube', cubeSchema);
export default Cube;
