import { compare, genSalt, hash } from 'bcryptjs';
import type { HydratedDocument } from 'mongoose';
import { createCookieSessionStorage, redirect } from 'solid-start';

import User from '@cubeartisan/cubeartisan/models/user';
import { getDefaultProtectedUser } from '@cubeartisan/cubeartisan/shared/userUtils';
import type { MongoUser, ProtectedUser } from '@cubeartisan/cubeartisan/types/user';

export const storage = createCookieSessionStorage({
  cookie: {
    name: import.meta.env.VITE_SESSION ?? 'session',
    secrets: [import.meta.env.VITE_SESSION_SECRET ?? ''],
    secure: import.meta.env.VITE_NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 * 4, // 4 weeks.
    httpOnly: true,
  },
});

export const getUserFromRequest = async (request: Request): Promise<HydratedDocument<MongoUser> | null> => {
  const cookie = request.headers.get('Cookie') ?? '';
  const session = await storage.getSession(cookie);
  const userId = session.get('userId');
  if (!userId) return null;
  return User.findById(userId);
};

export const ensureAuth = async (request: Request, redirectTo = '/'): Promise<HydratedDocument<MongoUser>> => {
  const user = await getUserFromRequest(request);
  if (!user) throw redirect(redirectTo);
  return user;
};

export const mongoUserToProtected = (user: HydratedDocument<MongoUser>): ProtectedUser => ({
  _id: user._id.toString(),
  username: user.username,
  about: user.about,
  image: user.image,
  image_name: user.image_name,
  artist: user.artist,
  theme: user.theme,
  email: user.email,
  confirmed: user.confirmed,
  hide_tag_colors: user.hide_tag_colors,
  followed_cubes: user.followed_cubes.map((id) => id.toString()),
  users_following: user.users_following.map((id) => id.toString()),
  notifications: user.notifications.map((notification) => ({
    ...notification,
    user_from: notification.user_from.toString(),
  })),
  roles: user.roles,
});

export const createUser = async (
  username: string,
  password: string,
  email: string,
): Promise<HydratedDocument<MongoUser>> => {
  const usernameLower = username.toLowerCase();
  const existingUser = await User.findOne({
    $or: [{ email }, { username_lower: usernameLower }],
  });
  if (existingUser) {
    if (existingUser.username_lower === usernameLower) {
      throw new Error(`Username ${usernameLower} is already taken.`);
    }
    if (existingUser.email === email) {
      throw new Error(`Email ${email} is already associated with an account.`);
    }
  }
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const user = new User({
    ...getDefaultProtectedUser(),
    username,
    username_lower: username.toLowerCase(),
    password: hashedPassword,
    email,
    edit_token: '',
  });
  await user.save();
  return user;
};

export const findUser = async (usernameOrEmail: string): Promise<HydratedDocument<MongoUser>> => {
  let queryKey = 'username_lower';
  if (usernameOrEmail.includes('@')) queryKey = 'email';
  else usernameOrEmail = usernameOrEmail.toLowerCase();
  const user = await User.findOne({ [queryKey]: usernameOrEmail });
  if (!user) {
    throw new Error(`User ${usernameOrEmail} not found.`);
  }
  return user;
};

export const verifyUser = async (
  usernameOrEmail: string,
  password: string,
): Promise<HydratedDocument<MongoUser> | null> => {
  const user = await findUser(usernameOrEmail);
  if (user) {
    const isMatch = await compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  return null;
};
