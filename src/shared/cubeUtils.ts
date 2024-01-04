import { v4 as uuid } from 'uuid';

import { createCardWithoutDetails } from '@cubeartisan/cubeartisan/shared/cardUtils';
import type { CubeDbCard } from '@cubeartisan/cubeartisan/types/card';
import type { BaseCube, CubeCards } from '@cubeartisan/cubeartisan/types/cube';

export const getDefaultBaseCube = (): BaseCube => ({
  name: 'New Cube',
  shortID: uuid(),
  isListed: true,
  privatePrices: false,
  overrideCategory: false,
  categoryPrefixes: [],
  categoryOverride: '',
  tag_colors: [],
  defaultDraftFormat: -1,
  numDecks: 0,
  description: '',
  image_uri: '',
  image_artist: '',
  image_name: '',
  owner_name: 'Unknown',
  date_created: Date.now().toString(),
  date_updated: Date.now().toString(),
  type: 'Vintage',
  default_sorts: ['Color Category', 'Types-Multicolor', 'Mana Value', 'Alphabetical'],
  default_show_unsorted: true,
  draft_formats: [],
  defaultStatus: 'Not Owned',
  defaultPrinting: 'recent',
  disableNotifications: false,
  keywords: [],
  categories: [],
  basics: [],
});

export const getDefaultBaseCubeWithCards = (): BaseCube & CubeCards<CubeDbCard> => ({
  ...getDefaultBaseCube(),
  cards: [],
  maybe: [],
  boards: [
    {
      name: 'Maybe',
      id: uuid(),
      cards: [],
    },
  ],
  unlimitedCards: [
    createCardWithoutDetails('scry:1d7dba1c-a702-43c0-8fca-e47bbad4a00f'),
    createCardWithoutDetails('scry:42232ea6-e31d-46a6-9f94-b2ad2416d79b'),
    createCardWithoutDetails('scry:19e71532-3f79-4fec-974f-b0e85c7fe701'),
    createCardWithoutDetails('scry:8365ab45-6d78-47ad-a6ed-282069b0fabc'),
    createCardWithoutDetails('scry:0c4eaecf-dd4c-45ab-9b50-2abe987d35d4'),
  ],
});
