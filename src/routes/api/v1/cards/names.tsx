import { json } from 'solid-start';

import { getCardNames } from '@cubeartisan/cubeartisan/backend/carddb';

export const GET = async () => {
  const names = await getCardNames();
  return json({
    success: true,
    names,
  });
};
