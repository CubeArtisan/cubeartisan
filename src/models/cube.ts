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

import { Model, model, models, Schema } from 'mongoose';

import cardSchema from '@cubeartisan/cubeartisan/models/shared/card';
import stepsSchema from '@cubeartisan/cubeartisan/models/shared/step';
import type { MongoCube } from '@cubeartisan/cubeartisan/types/cube';

export const draftFormatSchema = {
  title: String,
  multiples: Boolean,
  markdown: String,
  packs: [{ slots: [String], steps: stepsSchema }],
  defaultSeats: Number,
};

export const boardSchema = {
  name: String,
  id: String,
  cards: [cardSchema],
};

export const tagColorSchema = {
  tag: String,
  color: String,
};

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
  overrideCategory: {
    type: Boolean,
    default: false,
  },
  categoryOverride: {
    type: String,
    default: 'Vintage',
  },
  boards: [boardSchema],
  categoryPrefixes: [String],
  cards: [cardSchema],
  unlimitedCards: [cardSchema],
  maybe: [cardSchema],
  tag_colors: [tagColorSchema],
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
  default_sorts: [String],
  default_show_unsorted: {
    type: Boolean,
    default: true,
  },
  type: String,
  draft_formats: [draftFormatSchema],
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
  keywords: [String],
  categories: [String],
  date_updated: {
    type: String,
    required: true,
  },
  date_created: {
    type: String,
    required: true,
  },
});

cubeSchema.index({
  shortID: 1,
});

cubeSchema.index({
  isListed: 1,
  date_updated: -1,
});

cubeSchema.index({
  isListed: 1,
  date_created: -1,
});

cubeSchema.index({
  owner: 1,
  date_updated: -1,
});

cubeSchema.index({
  name: 1,
  date_updated: -1,
});

const Cube: Model<MongoCube> = models.Cube ?? model('Cube', cubeSchema);
export default Cube;
