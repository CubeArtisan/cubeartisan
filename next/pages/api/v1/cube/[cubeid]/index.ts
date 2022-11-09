import type { NextApiRequest, NextApiResponse } from 'next';

import { findCube, updateCube } from '@cubeartisan/next/backend/cubeUtils';
import { handler, setupMiddleware } from '@cubeartisan/next/backend/middleware';
import Cube from '@cubeartisan/next/models/cube';
import type { CubeChange } from '@cubeartisan/next/types/cube';

const retrieveCube = async (req: NextApiRequest, res: NextApiResponse) => {
  const cube = await findCube(req.query.cubeid as string, req.user);
  if (cube) {
    res.status(200).json({
      success: true,
      cube: cube.toObject(),
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Cube not found.',
    });
  }
};

const updateCubeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cube = await findCube(req.query.cubeid as string, req.user);
  if (cube !== null) {
    await updateCube(cube, req.body as CubeChange);
    res.status(200).json({
      success: true,
      cube: cube.toObject(),
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Cube not found.',
    });
  }
};

const deleteCube = async (req: NextApiRequest, res: NextApiResponse) => {
  const cube = await findCube(req.query.cubeid as string, req.user);
  if (cube) {
    await Cube.deleteOne({ _id: cube._id });
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Cube not found.',
    });
  }
};

const router = setupMiddleware().get(retrieveCube).put(updateCubeHandler).delete(deleteCube);

export default router.handler(handler);
