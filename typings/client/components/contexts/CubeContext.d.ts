export function makeDefaultCube(): Cube;
export const CubeContextProvider: React.FC<CubeContextProviderProps>;
export default CubeContext;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type CubeContextValue = {
    cube: Cube;
    canEdit: boolean;
    cubeID: string;
    hasCustomImages: boolean;
    setCube: ((cube: Cube) => void) | ((replacer: (cube: Cube) => Cube) => void);
    updateCubeCard: (index: number, card: Card) => void;
    updateCubeCards: (cards: Card[]) => void;
};
export type CubeContextProviderProps = {
    initialCube: Cube;
    canEdit?: boolean | undefined;
    children: React.ReactNode;
};
declare const CubeContext: import("react").Context<CubeContextValue>;
//# sourceMappingURL=CubeContext.d.ts.map