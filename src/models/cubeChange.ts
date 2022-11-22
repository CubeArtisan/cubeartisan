import { Model, model, models, Schema } from 'mongoose';

import { boardSchema, draftFormatSchema } from '@cubeartisan/cubeartisan/models/cube';
import cardSchema from '@cubeartisan/cubeartisan/models/shared/card';
import type { MongoCubeChange } from '@cubeartisan/cubeartisan/types/cube';

const updateActionSchema = {
  type: String,
  enum: ['add', 'remove', 'update'],
  required: true,
};

const cubeChangeSchema = new Schema<MongoCubeChange>({
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
  name: String,
  shortID: String,
  isListed: Boolean,
  privatePrices: Boolean,
  overrideCategory: Boolean,
  categoryOverride: String,
  categoryPrefixes: [String],
  cards: [
    {
      action: updateActionSchema,
      id: String,
      index: Number,
      item: cardSchema,
    },
  ],
  unlimitedCards: [
    {
      action: updateActionSchema,
      id: String,
      index: Number,
      item: cardSchema,
    },
  ],
  boards: [
    {
      action: updateActionSchema,
      id: String,
      index: Number,
      item: boardSchema,
      name: String,
      updates: [
        {
          action: updateActionSchema,
          id: String,
          index: Number,
          item: cardSchema,
        },
      ],
    },
  ],
  tag_colors: [
    {
      action: updateActionSchema,
      tag: String,
      color: String,
      index: Number,
      item: {
        tag: String,
        color: String,
      },
    },
  ],
  defaultDraftFormat: Number,
  description: String,
  image_uri: String,
  image_artist: String,
  image_name: String,
  default_sorts: [String],
  default_show_unsorted: Boolean,
  type: String,
  draft_formats: [
    {
      action: updateActionSchema,
      id: String,
      index: Number,
      item: draftFormatSchema,
    },
  ],
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
  keywords: [String],
  categories: [String],
});

cubeChangeSchema.index(
  {
    cubeId: 1,
    version: -1,
  },
  { unique: true },
);

const CubeChange: Model<MongoCubeChange> = models.CubeChange ?? model('CubeChange', cubeChangeSchema);
export default CubeChange;
