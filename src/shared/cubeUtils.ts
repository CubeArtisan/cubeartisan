import { v4 as uuid } from 'uuid';

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
  description: 'A new cube.',
  image_uri: '',
  image_artist: '',
  image_name: '',
  owner_name: 'Unknown',
  date_updated: Date.now().toString(),
  type: 'Vintage',
  default_sorts: null,
  default_show_unsorted: true,
  card_count: 0,
  draft_formats: [],
  defaultStatus: 'Not Owned',
  defaultPrinting: 'recent',
  disableNotifications: false,
  basics: [
    '1d7dba1c-a702-43c0-8fca-e47bbad4a00f',
    '42232ea6-e31d-46a6-9f94-b2ad2416d79b',
    '19e71532-3f79-4fec-974f-b0e85c7fe701',
    '8365ab45-6d78-47ad-a6ed-282069b0fabc',
    '0c4eaecf-dd4c-45ab-9b50-2abe987d35d4',
  ],
  tags: [],
  cardOracles: [],
  keywords: [],
  categories: [],
});

export const getDefaultBaseCubeWithCards = <C>(): BaseCube & CubeCards<C> => ({
  ...getDefaultBaseCube(),
  cards: [],
  maybe: [],
  boards: [
    {
      name: 'maybe',
      shortID: '0',
      cards: [],
    },
  ],
});
