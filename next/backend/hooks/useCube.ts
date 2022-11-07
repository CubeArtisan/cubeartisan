import { findCube } from '@cubeartisan/next/backend/cubeUtils';
import useUser from '@cubeartisan/next/backend/hooks/useUser';
import type { Cube } from '@cubeartisan/next/types/cube';

const useCube = async (idOrShortId: string): Promise<Cube | null> => {
  const user = await useUser();
  const cube = await findCube(idOrShortId, user);
  return cube?.toObject?.() ?? null;
};

export default useCube;
