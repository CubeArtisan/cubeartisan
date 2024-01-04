import { Accessor, createContext, Resource, Setter, useContext } from 'solid-js';

import type { Cube, CubePatch } from '@cubeartisan/cubeartisan/types/cube';

export type CubePageContextValue = {
  editSidebarOpen: Accessor<boolean>;
  setEditSidebarOpen: Setter<boolean>;
  cube: Resource<Cube | undefined>;
  currentPatch: Accessor<CubePatch>;
  setCurrentPatch: Setter<CubePatch>;
};

export const CubePageContext = createContext<CubePageContextValue>();

export const useCubePageContext = () => {
  const context = useContext(CubePageContext);

  if (context === undefined) {
    throw new Error('[cubeartisan]: `useCubeContext` must be used witin the `cubeId` route');
  }

  return context;
};
