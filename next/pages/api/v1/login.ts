import type { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';

import { handler, NextHandler, requireDb, setupMiddleware } from '@cubeartisan/next/backend/middleware';
import { findUser } from '@cubeartisan/next/backend/user';

const router = setupMiddleware({ extraMiddleware: [requireDb] }).post(
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const user = await findUser(req.body.username);
    if (!user) {
      return res.redirect('/login');
    }
    req.body.username = user.username;
    return next();
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false,
  }),
  (req, res) => {
    // TODO: fix confirmation and check it here.
    let redirect = '/';
    if (req.body.loginCallback) {
      redirect = req.body.loginCallback;
    }
    return res.redirect(redirect);
  },
);

export default router.handler(handler);
