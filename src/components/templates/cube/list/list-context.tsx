/**
 * layout and context provider
 * accepts cube object
 */

import { createContext, ParentComponent, useContext } from 'solid-js';

type CubeListContextValue = {
  name: string;
  owner_name: string;
};

const CubeListContext = createContext<CubeListContextValue>({ name: 'test', owner_name: 'test' });
export const useCubeListContext = () => useContext(CubeListContext);

type CubeListViewProps = {
  cube: {
    name: string;
    owner_name: string;
  };
};

export const CubeListContextProvider: ParentComponent<CubeListViewProps> = (props) => {
  const context: CubeListContextValue = {
    name: () => props.cube.name,
    owner_name: () => props.cube.owner_name,
  };

  return <CubeListContext.Provider value={context}>{props.children}</CubeListContext.Provider>;
};
