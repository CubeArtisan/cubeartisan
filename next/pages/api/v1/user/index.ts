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

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.user) {
    const user = req.user.toObject();
    return res.status(200).end({
      success: true,
      user: {
        username: user.username,
        about: user.about,
        image: user.image,
        image_name: user.image_name,
        artist: user.artist,
        theme: user.theme,
        email: user.email,
        confirmed: user.confirmed,
        hide_tag_colors: user.hide_tag_colors,
        followed_cubes: user.followed_cubes,
        users_following: user.users_following,
        notifications: user.notifications,
        roles: user.roles,
      },
    });
  }
  return res.status(401).end({
    success: false,
    message: 'Not logged in.',
  });
};

const router = setupMiddleware({ extraMiddleware: [requireDb] })
  .post(registerUser)
  .get(getUser);

export default router.handler(handler);
