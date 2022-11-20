import { APIEvent, redirect } from 'solid-start';

import { storage, verifyUser } from '@cubeartisan/cubeartisan/backend/user';
import { getQueryParams } from '@cubeartisan/cubeartisan/backend/utils';

export const DELETE = async ({ request }: APIEvent) => {
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
};

export const POST = async ({ request }: APIEvent) => {
  const redirectTo = getQueryParams<{ redirect?: string }>(request).redirect ?? '/';
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  if (typeof username !== 'string' || typeof password !== 'string') return redirect('/login');
  const user = await verifyUser(username, password);
  if (user) {
    const session = await storage.getSession();
    session.set('userId', user._id);
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    });
  }
  return redirect('/login');
};
