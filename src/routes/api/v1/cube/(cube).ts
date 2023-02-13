import { APIEvent, redirect } from 'solid-start';

import { createCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
import { ensureAuth } from '@cubeartisan/cubeartisan/backend/user';

export const POST = async ({ request }: APIEvent) => {
  const user = await ensureAuth(request);
  const formData = await request.formData();
  const name = formData.get('name');
  if (typeof name !== 'string') return redirect('/');
  const cube = await createCube(user, name);
  if (!cube) return redirect('/');
  return redirect(`/cube/${cube.shortID}`);
};
