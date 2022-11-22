import type { HydratedDocument, Types } from 'mongoose';
import mongoose from 'mongoose';
import { json } from 'solid-start';

import Cube from '@cubeartisan/cubeartisan/models/cube';
import CubeChangeModel from '@cubeartisan/cubeartisan/models/cubeChange';
import { applyCubePatch, getDefaultBaseCubeWithCards } from '@cubeartisan/cubeartisan/shared/cubeUtils';
import { hasProfanity, toBase36 } from '@cubeartisan/cubeartisan/shared/utils';
import type { CubeChange, MongoCube } from '@cubeartisan/cubeartisan/types/cube';
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

export const updateCube = async (cube: HydratedDocument<MongoCube>, changes: CubeChange) => {
  applyCubePatch(cube, changes);
  const version =
    ((await CubeChangeModel.findOne({ cubeId: cube._id }, 'version').sort({ version: -1 }))?.version ?? 0) + 1;
  const cubeChange = new CubeChangeModel({
    ...changes,
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
