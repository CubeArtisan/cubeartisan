import type { NextApiRequest, NextApiResponse } from 'next';

import { findCube } from '@cubeartisan/next/backend/cubeUtils';
import { handler, setupMiddleware } from '@cubeartisan/next/backend/middleware';

const retrieveCube = async (req: NextApiRequest, res: NextApiResponse) => {
  const cube = await findCube(req.query.cubeid as string, req.user);
  if (cube) {
    res.status(200).send({
      success: true,
      cube: cube.toObject(),
    });
  } else {
    res.status(404).send({
      success: false,
      message: 'Cube not found.',
    });
  }
  return res.end();
};

const router = setupMiddleware().get(retrieveCube);

export default router.handler(handler);
