import type { CubeDbCard } from '@cubeartisan/cubeartisan/types/card';

// eslint-disable-next-line import/prefer-default-export
export const createCardWithoutDetails = (cardID: string): CubeDbCard => ({
  id: cardID,
  sortingPatches: [],
  metadata: {
    tags: [],
    price: null,
    notes: '',
    addedTmsp: new Date().toString(),
    finish: 'nonfoil',
    status: 'Not Owned',
  },
});
