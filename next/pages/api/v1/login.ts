import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { handler, requireDb, setupMiddleware } from '@cubeartisan/next/backend/middleware';
import { findUser } from '@cubeartisan/next/backend/user';

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await findUser(req.body.username);
  if (user) {
    const isMatch = await compare(req.body.password, user.password);
    if (isMatch) {
      req.session.id = user._id.toString();
      await req.session.save();
      return res.redirect('/');
    }
  }
  return res.redirect('/login');
};

const router = setupMiddleware({ extraMiddleware: [requireDb] }).post(loginUser);

export default router.handler(handler);
