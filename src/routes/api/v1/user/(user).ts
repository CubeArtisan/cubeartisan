import { APIEvent, json, redirect } from 'solid-start';

import logger from '@cubeartisan/cubeartisan/backend/logger';
import { createUser, getUserFromRequest, mongoUserToProtected } from '@cubeartisan/cubeartisan/backend/user';

export const GET = async ({ request }: APIEvent) => {
  const user = await getUserFromRequest(request);
  if (user) {
    return json({
      success: true,
      user: mongoUserToProtected(user),
    });
  }
  return json({
    success: false,
  });
};

export const POST = async ({ request }: APIEvent) => {
  try {
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return redirect('/register');
    }
    const user = await createUser(username, password, email);
    if (!user) return redirect('/register');
    return redirect('/login');
  } catch (err) {
    const e = err as Error;
    logger.warn(e.message, {
      method: 'POST',
      path: '/user',
      stack: e.stack,
      message: e.message,
    });
    return redirect('/register');
  }
};
