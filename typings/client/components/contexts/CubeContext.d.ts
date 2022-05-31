export function CubeContextProvider({ initialCube, canEdit, ...props }: {
    [x: string]: any;
    initialCube: any;
    canEdit: any;
}): JSX.Element;
export namespace CubeContextProvider {
    namespace propTypes {
        const initialCube: PropTypes.Requireable<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                _id: PropTypes.Requireable<string>;
                index: PropTypes.Requireable<number>;
                imgUrl: PropTypes.Requireable<string>;
                imgBackUrl: PropTypes.Requireable<string>;
                cardID: PropTypes.Validator<string>;
                colors: PropTypes.Requireable<(string | null | undefined)[]>;
                tags: PropTypes.Requireable<(string | null | undefined)[]>;
                details: PropTypes.Requireable<PropTypes.InferProps<{
                    _id: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                    image_normal: PropTypes.Validator<string>;
                    image_flip: PropTypes.Requireable<string>;
                    image_small: PropTypes.Requireable<string>;
                }>>;
                addedTmsp: PropTypes.Requireable<string>;
            }> | null | undefined)[]>;
        }>>;
        const canEdit: PropTypes.Requireable<boolean>;
        const cubeID: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        const initialCube_1: {};
        export { initialCube_1 as initialCube };
        const canEdit_1: boolean;
        export { canEdit_1 as canEdit };
    }
}
export default CubeContext;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type CubeContextValue = import('react').Context<CubeContextValue>;
import PropTypes from "prop-types";
/**
 @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Cube} Cube
 @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef CubeContextValue
 * @property {Cube?} cube
 * @property {boolean} canEdit
 * @property {string?} cubeID
 * @property {boolean} hasCustomImages
 * @property {((cube: Cube) => void) | ((replacer: (cube: Cube) => Cube) => void)}
 * @property {(index: number, card: Card) => void} updateCubeCard
 * @property {(cards: Card[]) => void} updateCubeCards
 * @type {import('react').Context<CubeContextValue>}
 */
declare const CubeContext: import("react").Context<{
    cube: {};
    canEdit: boolean;
    cubeID: null;
    hasCustomImages: boolean;
    setCube: () => void;
    updateCubeCard: () => void;
    updateCubeCards: () => void;
}>;
//# sourceMappingURL=CubeContext.d.ts.map