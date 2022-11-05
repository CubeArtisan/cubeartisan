import type { NextApiRequest, NextApiResponse } from 'next';

import { handler, setupMiddleware } from '@cubeartisan/next/backend/middleware';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  await req.session.destroy();
  res.status(204).end();
};

const router = setupMiddleware().post(logout);

export default router.handler(handler);
