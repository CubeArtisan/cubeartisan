import type { NextApiRequest, NextApiResponse } from 'next';

import { handler, requireDb, setupMiddleware } from '@cubeartisan/next/backend/middleware';
import { createUser } from '@cubeartisan/next/backend/user';

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await createUser(req.body.username, req.body.password, req.body.email);
    if (!user) {
      return res.redirect('/register');
    }
    return res.redirect('/login');
  } catch (err) {
    req.logger.warn(err as Error, { method: 'POST', path: '/user' });
    return res.redirect('/register');
  }
};

const router = setupMiddleware({ extraMiddleware: [requireDb] }).post(registerUser);

export default router.handler(handler);
