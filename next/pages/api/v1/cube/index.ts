import type { HydratedDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createCube } from '@cubeartisan/next/backend/cubeUtils';
import { ensureAuth, handler, setupMiddleware } from '@cubeartisan/next/backend/middleware';
import type { MongoUser } from '@cubeartisan/next/types/user';

const createCubeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cube = await createCube(req.user as HydratedDocument<MongoUser>, req.body.name);
  return res.redirect(`/cube/${cube.shortID}`);
};

const router = setupMiddleware({ extraMiddleware: [ensureAuth] }).post(createCubeHandler);

export default router.handler(handler);
