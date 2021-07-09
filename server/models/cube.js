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
import stepsSchema from '@cubeartisan/server/models/shared/stepsSchema.js';
import migrations from '@cubeartisan/server/models/migrations/cubeMigrations.js';

const CURRENT_SCHEMA_VERSION = migrations.slice(-1)[0].version;

// Cube schema
const cubeSchema = mongoose.Schema({
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
    type: String,
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
  categoryPrefixes: {
    type: [String],
    default: [],
  },
  cards: {
    type: [cardSchema],
    default: [],
  },
  maybe: {
    type: [cardSchema],
    default: [],
  },
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
  draft_formats: {
    type: [
      {
        title: String,
        multiples: Boolean,
        html: String,
        markdown: String,
        packs: {
          type: [{ slots: [String], steps: stepsSchema }],
        },
      },
    ],
    default: [],
  },
  users_following: {
    type: [String],
    default: [],
  },
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
  schemaVersion: {
    type: Number,
    default() {
      if (this.isNew) {
        return CURRENT_SCHEMA_VERSION;
      }
      return void 0; // eslint-disable-line
    },
  },
  useCubeElo: {
    type: Boolean,
    default: false,
  },
  basics: {
    type: [String],
    default: [
      '1d7dba1c-a702-43c0-8fca-e47bbad4a00f',
      '42232ea6-e31d-46a6-9f94-b2ad2416d79b',
      '19e71532-3f79-4fec-974f-b0e85c7fe701',
      '8365ab45-6d78-47ad-a6ed-282069b0fabc',
      '0c4eaecf-dd4c-45ab-9b50-2abe987d35d4',
    ],
  },
  // These fields are just for indexing
  tags: {
    type: [String],
    default: [],
  },
  cardOracles: {
    type: [String],
    default: [],
  },
  keywords: {
    type: [String],
    default: [],
  },
  categories: {
    type: [String],
    default: [],
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

cubeSchema.pre('save', function saveCubeHook(next) {
  this.schemaVersion = CURRENT_SCHEMA_VERSION;
  if (this.cards) {
    this.card_count = this.cards.length;
  }
  next();
});

const Cube = mongoose.model('Cube', cubeSchema);
Cube.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;
Cube.LAYOUT_FIELDS =
  '_id owner name type card_count overrideCategory categoryOverride categoryPrefixes image_uri shortID';
Cube.PREVIEW_FIELDS =
  '_id shortID name card_count type overrideCategory categoryOverride categoryPrefixes image_name image_artist image_uri owner owner_name image_uri';

export default Cube;
