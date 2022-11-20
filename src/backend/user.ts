import { compare, genSalt, hash } from 'bcryptjs';
import type { HydratedDocument } from 'mongoose';
import { createCookieSessionStorage } from 'solid-start';

import User from '@cubeartisan/cubeartisan/models/user';
import { getDefaultProtectedUser } from '@cubeartisan/cubeartisan/shared/userUtils';
import type { MongoUser } from '@cubeartisan/cubeartisan/types/user';

export const storage = createCookieSessionStorage({
  cookie: {
    name: process.env.SESSION ?? 'session',
    secrets: [process.env.SESSION_SECRET ?? ''],
    secure: process.env.NODE_ENV === 'production',
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
