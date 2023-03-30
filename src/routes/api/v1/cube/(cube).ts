import { APIEvent, redirect } from 'solid-start';

import { createCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
import { ensureAuth } from '@cubeartisan/cubeartisan/backend/user';

export const POST = async ({ request }: APIEvent) => {
  const user = await ensureAuth(request);
  const formData = await request.formData();
  const name = formData.get('name');
  console.log(name);
  if (typeof name !== 'string') return redirect('/', { status: 400 });
  const cube = await createCube(user, name);
  console.log(cube);
  if (!cube) return redirect('/', { status: 500 });
  return redirect(`/cube/${cube.shortID}`);
};
