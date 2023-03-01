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
 */
import { Model, model, models, Schema } from 'mongoose';

import { boardSchema, draftFormatSchema, tagColorSchema } from '@cubeartisan/cubeartisan/models/cube';
import cardSchema from '@cubeartisan/cubeartisan/models/shared/card';
import patchArray from '@cubeartisan/cubeartisan/models/shared/patch';
import type { CubeDbCard } from '@cubeartisan/cubeartisan/types/card';
import type { MongoCubeChange } from '@cubeartisan/cubeartisan/types/cube';

const stepsSchema = {
  action: {
    type: String,
    enum: ['pass', 'pick', 'trash', 'pickrandom', 'trashrandom'],
  },
  amount: Number,
};

const cubePatchSchema = new Schema<MongoCubeChange>({
  version: {
    type: Number,
    required: true,
  },
  cubeId: {
    type: Schema.Types.ObjectId,
    ref: 'Cube',
    required: true,
  },
  date_updated: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'CubePatch',
  },
  patch: {
    name: String,
    shortID: String,
    isListed: Boolean,
    privatePrices: Boolean,
    overrideCategory: Boolean,
    categoryOverride: String,
    categoryPrefixes: [String],
    cards: patchArray<CubeDbCard>(cardSchema, cardSchema),
    unlimitedCards: patchArray<CubeDbCard>(cardSchema, cardSchema),
    boards: patchArray(boardSchema, { name: String, cards: patchArray<CubeDbCard>(cardSchema, cardSchema) }),
    tag_colors: patchArray(tagColorSchema, tagColorSchema),
    defaultDraftFormat: Number,
    description: String,
    image_uri: String,
    image_artist: String,
    image_name: String,
    default_sorts: patchArray(String, String),
    default_show_unsorted: Boolean,
    type: String,
    draft_formats: patchArray(draftFormatSchema, {
      title: String,
      multiples: Boolean,
      markdown: String,
      defaultSeats: Number,
      packs: patchArray(draftFormatSchema.packs, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        slots: patchArray<string>(String, String),
        steps: patchArray(stepsSchema, stepsSchema),
      }),
    }),
    defaultStatus: String,
    defaultPrinting: String,
    disableNotifications: Boolean,
    keywords: patchArray(String, String),
    categories: patchArray(String, String),
  },
});

cubePatchSchema.index(
  {
    cubeId: 1,
    version: -1,
  },
  { unique: true },
);

const CubePatch: Model<MongoCubeChange> = models['CubePatch'] ?? model('CubePatch', cubePatchSchema); // eslint-disable-line dot-notation
export default CubePatch;
