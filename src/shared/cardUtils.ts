import type { CardWithoutDetails } from '@cubeartisan/cubeartisan/types/card';

// eslint-disable-next-line import/prefer-default-export
export const createCardWithoutDetails = (cardID: string): CardWithoutDetails => ({
  addedTmsp: Date.now().toString(),
  cardID,
  cmc: null,
  colorCategory: null,
  colors: null,
  finish: 'Non-foil',
  imgBackUrl: null,
  imgUrl: null,
  name: null,
  notes: '',
  rarity: null,
  status: 'Not Owned',
  tags: [],
  type_line: null,
});
