import type { HydratedDocument, Types } from 'mongoose';
import mongoose from 'mongoose';
import { json } from 'solid-start';

import { loadCard } from '@cubeartisan/cubeartisan/backend/carddb';
import Cube from '@cubeartisan/cubeartisan/models/cube';
import CubePatchModel from '@cubeartisan/cubeartisan/models/cubePatch';
import { getDefaultBaseCubeWithCards } from '@cubeartisan/cubeartisan/shared/cubeUtils';
import { applyPatch } from '@cubeartisan/cubeartisan/shared/patches';
import { hasProfanity, toBase36 } from '@cubeartisan/cubeartisan/shared/utils';
import type { CubeCard } from '@cubeartisan/cubeartisan/types/card';
import type { CubePatch, Cube as CubeType, MongoCube, MongoCubeWithId } from '@cubeartisan/cubeartisan/types/cube';
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
    ...getDefaultBaseCubeWithCards(),
    name,
    owner: user._id,
    owner_name: user.username,
    users_following: [],
    shortID,
  });
  await cube.save();
  return cube;
};

export const addCards = async (cube: MongoCubeWithId): Promise<CubeType> => {
  console.log(cube.toObject());

  return {
    id: cube._id?.toString?.(),
    name: cube.name,
    shortID: cube.shortID,
    isListed: cube.isListed,
    privatePrices: cube.privatePrices,
    overrideCategory: cube.overrideCategory,
    categoryOverride: cube.categoryOverride,
    categoryPrefixes: cube.categoryPrefixes,
    tag_colors: cube.tag_colors,
    defaultDraftFormat: cube.defaultDraftFormat,
    numDecks: cube.numDecks,
    description: cube.description,
    image_uri: cube.image_uri,
    image_artist: cube.image_artist,
    image_name: cube.image_name,
    owner_name: cube.owner_name,
    date_created: cube.date_created,
    date_updated: cube.date_updated,
    type: cube.type,
    default_sorts: cube.default_sorts,
    default_show_unsorted: cube.default_show_unsorted,
    draft_formats: cube.draft_formats,
    defaultStatus: cube.defaultStatus,
    defaultPrinting: cube.defaultPrinting,
    disableNotifications: cube.disableNotifications,
    keywords: cube.keywords,
    categories: cube.categories,
    owner: cube.owner?.toString?.(),
    // users_following: cube.users_following.map((user) => user?.toString?.()),
    cards: (await Promise.all(cube.cards.map(loadCard))) as CubeCard[],
    // boards: await Promise.all(
    //   cube.boards.map(async ({ name, id, cards }) => ({
    //     name,
    //     id,
    //     cards: (await Promise.all(cards.map(loadCard))) as CubeCard[],
    //   })),
    // ),
    // unlimitedCards: (await Promise.all(cube.unlimitedCards.map(loadCard))) as CubeCard[],
  };
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

export const updateCube = async (cube: HydratedDocument<MongoCube>, changes: CubePatch) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  applyPatch(cube, changes);
  const version =
    ((await CubePatchModel.findOne({ cubeId: cube._id }, 'version').sort({ version: -1 }))?.version ?? 0) + 1;
  const cubeChange = new CubePatchModel({
    patch: changes,
    version,
    cubeId: cube._id,
    date_updated: Date.now().toString(),
  });
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const [savedCube, savedCubeChange] = await Promise.all([cube.save({ session }), cubeChange.save({ session })]);
      if (savedCube !== cube || savedCubeChange !== cubeChange) {
        throw json({ success: false, message: 'Failed to save the updated cube.' }, { status: 500 });
      }
    });
  } finally {
    await session.endSession();
  }
  return cube;
};
