import type { HydratedDocument, Types } from 'mongoose';

import Cube from '@cubeartisan/next/models/cube';
import { getDefaultBaseCubeWithCards } from '@cubeartisan/next/shared/cubeUtils';
import { hasProfanity, toBase36 } from '@cubeartisan/next/shared/utils';
import type { CardWithoutDetails } from '@cubeartisan/next/types/card';
import type { MongoCube } from '@cubeartisan/next/types/cube';
import type { MongoUser } from '@cubeartisan/next/types/user';

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
  user: HydratedDocument<MongoUser> | null,
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
