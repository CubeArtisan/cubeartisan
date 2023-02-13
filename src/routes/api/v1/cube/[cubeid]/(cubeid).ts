import { APIEvent, json } from 'solid-start';

import { findCube, updateCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
import { ensureAuth, getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import type { CubePatch } from '@cubeartisan/cubeartisan/types/cube';

export const GET = async ({ request, params }: APIEvent) => {
  const user = await getUserFromRequest(request);
  const cubeId = params['cubeid']; // eslint-disable-line dot-notation
  if (cubeId) {
    const cube = await findCube(cubeId, user);
    if (cube) {
      return json({
        success: true,
        data: cube.toObject(),
      });
    }
  }
  return json(
    {
      success: false,
      message: `Cube ${cubeId} not found.`,
    },
    { status: 404 },
  );
};

export const PUT = async ({ request, params }: APIEvent) => {
  const user = await ensureAuth(request);
  const cubeId = params['cubeid']; // eslint-disable-line dot-notation
  if (cubeId) {
    const cube = await findCube(cubeId, user);
    if (cube) {
      const changes = (await request.json()) as CubePatch;
      await updateCube(cube, changes);
      return json({
        success: true,
        data: cube.toObject(),
      });
    }
  }
  return json(
    {
      success: false,
      message: `Cube ${cubeId} not found.`,
    },
    { status: 404 },
  );
};
