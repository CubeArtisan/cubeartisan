import type { HydratedDocument, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';

import Cube from '@cubeartisan/cubeartisan/models/cube';
import { getDefaultBaseCubeWithCards } from '@cubeartisan/cubeartisan/shared/cubeUtils';
import { hasProfanity, toBase36 } from '@cubeartisan/cubeartisan/shared/utils';
import type { CardWithoutDetails } from '@cubeartisan/cubeartisan/types/card';
import type {
  Board,
  BoardChange,
  CardChange,
  CubeChange,
  CubeNonArrayChanges,
  DraftFormat,
  FormatChange,
  MongoCube,
  StringChange,
} from '@cubeartisan/cubeartisan/types/cube';
import type { MongoUser, ProtectedUser } from '@cubeartisan/cubeartisan/types/user';

export const generateShortId = async (): Promise<string> => {
  const cubeCount = await Cube.estimatedDocumentCount().exec();
  // Make collisions less likely
  const space = cubeCount * 36 + 36;

  let newId = '';
  let isGoodId = false;
  while (!isGoodId) {
    const rand = Math.floor(Math.random() * space);
    newId = toBase36(rand);
    if (!hasProfanity(newId)) {
      // eslint-disable-next-line no-await-in-loop
      const cubeWithId = await Cube.findOne({ shortID: newId });
      isGoodId = !cubeWithId;
    }
  }

  return newId;
};

export const createCube = async (
  user: HydratedDocument<MongoUser>,
  name: string,
): Promise<HydratedDocument<MongoCube>> => {
  if (hasProfanity(name)) throw new Error('Name may not contain profanity.');
  const shortID = await generateShortId();
  const cube = new Cube({
    ...getDefaultBaseCubeWithCards<CardWithoutDetails>(),
    name,
    owner: user._id,
    owner_name: user.username,
    users_following: [],
    shortID,
  });
  await cube.save();
  return cube;
};

export const findCube = async (
  idOrShortId: string | Types.ObjectId,
  user: ProtectedUser | HydratedDocument<MongoUser> | null,
): Promise<HydratedDocument<MongoCube> | null> => {
  const idOrShortIdStr: string = idOrShortId.toString();
  let query: { shortID: string } | { _id: string } = { shortID: idOrShortIdStr };
  if (/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(idOrShortIdStr)) {
    query = { _id: idOrShortIdStr };
  }
  const cube = await Cube.findOne(query);
  if (cube && (cube.isListed || user?._id?.toString?.() === cube.owner.toString())) return cube;
  return null;
};

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

const applyStringChange = (strings: (string | Types.ObjectId)[], changes: StringChange[]) => {
  const toRemove: number[] = [];
  const toAdd: string[] = [];
  for (const change of changes) {
    if (change.action === 'remove') {
      if (strings[change.index].toString() === change.id) {
        if (!toRemove.includes(change.index)) {
          toRemove.push(change.index);
        }
      } else {
        throw new Error(`Tried to remove card at index ${change.index} but it had a different id.`);
      }
    } else if (change.action === 'add') {
      toAdd.push(change.item);
    }
  }
  for (const index of toRemove.sort((a, b) => b - a)) {
    delete strings[index];
  }
  strings.push(...toAdd);
};

export const updateCube = async (cube: HydratedDocument<MongoCube>, changes: CubeChange) => {
  for (const key of Object.keys(changes)) {
    if (key === 'draft_formats') {
      applyDraftFormatChange(cube.draft_formats, changes.draft_formats as FormatChange[]);
    } else if (key === 'cards') {
      applyCardArrayChange(cube.cards, changes.cards as CardChange[]);
    } else if (key === 'unlimitedCards') {
      applyCardArrayChange(cube.unlimitedCards, changes.unlimitedCards as CardChange[]);
    } else if (key === 'boards') {
      applyBoardChange(cube.boards, changes.boards as BoardChange[]);
    } else if (key === 'users_following') {
      applyStringChange(cube.users_following, changes.users_following as StringChange[]);
      // eslint-disable-next-line no-restricted-syntax
    } else if (key in cube && key in changes) {
      // This is type safe by the definition of CubeNonArrayChanges, but typescript fails to verify
      // that so this is the workaround.
      cube[key as keyof CubeNonArrayChanges] = changes[key as keyof CubeNonArrayChanges] as never;
    }
  }
};
