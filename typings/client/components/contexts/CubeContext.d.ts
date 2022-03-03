export function CubeContextProvider({ initialCube, canEdit, ...props }: {
    [x: string]: any;
    initialCube: any;
    canEdit: any;
}): JSX.Element;
export namespace CubeContextProvider {
    namespace propTypes {
        const initialCube: any;
        const canEdit: any;
        const cubeID: any;
    }
    namespace defaultProps {
        const initialCube_1: {};
        export { initialCube_1 as initialCube };
        const canEdit_1: boolean;
        export { canEdit_1 as canEdit };
    }
}
export default CubeContext;
export type ContextType = any;
/**
 * @typedef {import('react').Context<{ cube: any, canEdit: Boolean, cubeID: string?, hasCustomImages: Boolean,
 *           setCube: ((cube: any) => void) | ((replacer: (cube: any) => any) => void),
 *           updateCubeCard: (index: number, card: any) => void,
 *           updateCubeCards: (cards: any[]) => void }>} ContextType
 * @type ContextType
 */
declare const CubeContext: any;
//# sourceMappingURL=CubeContext.d.ts.map