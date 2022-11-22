import { v4 as uuid } from 'uuid';

import { createCardWithoutDetails } from '@cubeartisan/cubeartisan/shared/cardUtils';
import type { CardWithoutDetails } from '@cubeartisan/cubeartisan/types/card';
import type {
  BaseCube,
  Board,
  BoardChange,
  CardChange,
  Cube,
  CubeCards,
  CubeChange,
  CubeNonArrayChanges,
  DraftFormat,
  FormatChange,
  MongoCube,
  TagChange,
  TagColor,
} from '@cubeartisan/cubeartisan/types/cube';

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

export const getDefaultBaseCubeWithCards = (): BaseCube & CubeCards<CardWithoutDetails> => ({
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
    createCardWithoutDetails('1d7dba1c-a702-43c0-8fca-e47bbad4a00f'),
    createCardWithoutDetails('42232ea6-e31d-46a6-9f94-b2ad2416d79b'),
    createCardWithoutDetails('19e71532-3f79-4fec-974f-b0e85c7fe701'),
    createCardWithoutDetails('8365ab45-6d78-47ad-a6ed-282069b0fabc'),
    createCardWithoutDetails('0c4eaecf-dd4c-45ab-9b50-2abe987d35d4'),
  ],
});

const applyDraftFormatChange = (draftFormats: DraftFormat[], changes: FormatChange[]) => {
  const toRemove: number[] = [];
  const toAdd: DraftFormat[] = [];
  for (const change of changes) {
    if (change.action === 'remove') {
      if (draftFormats[change.index]?.id === change.id) {
        if (!toRemove.includes(change.index)) {
          toRemove.push(change.index);
        }
      } else {
        throw new Error(`Tried to remove draft format at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'update') {
      if (draftFormats[change.index]?.id === change.item.id) {
        draftFormats[change.index] = change.item;
      } else {
        throw new Error(`Tried to remove draft format at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'add') {
      toAdd.push({ ...change.item, id: uuid() });
    }
  }
  for (const index of toRemove.sort((a, b) => b - a)) {
    delete draftFormats[index];
  }
  draftFormats.push(...toAdd);
};

const applyCardArrayChange = (cards: CardWithoutDetails[], changes: CardChange[]) => {
  const toRemove: number[] = [];
  const toAdd: CardWithoutDetails[] = [];
  for (const change of changes) {
    if (change.action === 'remove') {
      if (cards[change.index]?.cardID === change.id) {
        if (!toRemove.includes(change.index)) {
          toRemove.push(change.index);
        }
      } else {
        throw new Error(`Tried to remove card at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'update') {
      if (cards[change.index]?.cardID === change.item.cardID) {
        cards[change.index] = change.item;
      } else {
        throw new Error(`Tried to update card at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'add') {
      toAdd.push(change.item);
    }
  }
  for (const index of toRemove.sort((a, b) => b - a)) {
    delete cards[index];
  }
  cards.push(...toAdd);
};

const applyBoardChange = (boards: Board<CardWithoutDetails>[], changes: BoardChange[]) => {
  const toRemove: number[] = [];
  const toAdd: Board<CardWithoutDetails>[] = [];
  for (const change of changes) {
    if (change.action === 'remove') {
      if (boards[change.index]?.id === change.id) {
        if (!toRemove.includes(change.index)) {
          toRemove.push(change.index);
        }
      } else {
        throw new Error(`Tried to remove board at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'update') {
      if (boards[change.index]?.id === change.id) {
        // eslint-disable-next-line no-restricted-syntax
        if ('name' in change && change.name !== undefined) {
          boards[change.index].name = change.name;
        }
        applyCardArrayChange(boards[change.index].cards, change.updates);
      } else {
        throw new Error(`Tried to update board at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'add') {
      toAdd.push({ ...change.item, id: uuid() });
    }
  }
  for (const index of toRemove.sort((a, b) => b - a)) {
    delete boards[index];
  }
  boards.push(...toAdd);
};

const applyTagChange = (tags: TagColor[], changes: TagChange[]) => {
  const toRemove: number[] = [];
  const toAdd: TagColor[] = [];
  for (const change of changes) {
    if (change.action === 'remove') {
      if (tags[change.index].tag === change.tag) {
        if (!toRemove.includes(change.index)) {
          toRemove.push(change.index);
        }
      } else {
        throw new Error(`Tried to remove tag at index ${change.index} but it had a different name.`);
      }
    } else if (change.action === 'update') {
      if (tags[change.index].tag === change.tag) {
        tags[change.index].color = change.color;
      } else {
        throw new Error(`Tried to remove tag at index ${change.index} but it had a different name.`);
      }
    } else if (change.action === 'add') {
      toAdd.push(change.item);
    }
  }
  for (const index of toRemove.sort((a, b) => b - a)) {
    delete tags[index];
  }
  for (const add of toAdd) {
    if (tags.map((t) => t.tag).includes(add.tag)) {
      throw new Error(`Tried to add tag "${add.tag}" as a tag, but that tag already exists.`);
    }
    tags.push(add);
  }
};

export const applyCubePatch = (cube: Cube | MongoCube, changes: CubeChange) => {
  for (const key of Object.keys(changes)) {
    if (key === 'draft_formats') {
      applyDraftFormatChange(cube.draft_formats, changes.draft_formats as FormatChange[]);
    } else if (key === 'cards') {
      applyCardArrayChange(cube.cards, changes.cards as CardChange[]);
    } else if (key === 'unlimitedCards') {
      applyCardArrayChange(cube.unlimitedCards, changes.unlimitedCards as CardChange[]);
    } else if (key === 'boards') {
      applyBoardChange(cube.boards, changes.boards as BoardChange[]);
    } else if (key === 'tag_colors') {
      applyTagChange(cube.tag_colors, changes.tag_colors as TagChange[]);
      // eslint-disable-next-line no-restricted-syntax
    } else if (key in cube && key in changes) {
      // This is type safe by the definition of CubeNonArrayChanges, but typescript fails to verify
      // that so this is the workaround.
      cube[key as keyof CubeNonArrayChanges] = changes[key as keyof CubeNonArrayChanges] as never;
    }
  }
  return cube;
};
