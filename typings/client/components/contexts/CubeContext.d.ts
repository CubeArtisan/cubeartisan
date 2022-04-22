export function CubeContextProvider({ initialCube, canEdit, ...props }: {
    [x: string]: any;
    initialCube: any;
    canEdit: any;
}): JSX.Element;
export namespace CubeContextProvider {
    namespace propTypes {
        const initialCube: PropTypes.Requireable<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Requireable<string>;
                index: PropTypes.Requireable<number>;
                imgUrl: PropTypes.Requireable<string>;
                imgBackUrl: PropTypes.Requireable<string>;
                cardID: PropTypes.Validator<string>;
                colors: PropTypes.Requireable<string[]>;
                tags: PropTypes.Requireable<string[]>;
                details: PropTypes.Requireable<PropTypes.InferProps<{
                    _id: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                    image_normal: PropTypes.Validator<string>;
                }>>;
            }>[]>;
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
export type ContextType = React.Context<{
    cube: any;
    canEdit: boolean;
    cubeID: string | null;
    hasCustomImages: boolean;
    setCube: ((cube: any) => void) | ((replacer: (cube: any) => any) => void);
    updateCubeCard: (index: number, card: any) => void;
    updateCubeCards: (cards: any[]) => void;
}>;
import PropTypes from "prop-types";
/**
 * @typedef {import('react').Context<{ cube: any, canEdit: Boolean, cubeID: string?, hasCustomImages: Boolean,
 *           setCube: ((cube: any) => void) | ((replacer: (cube: any) => any) => void),
 *           updateCubeCard: (index: number, card: any) => void,
 *           updateCubeCards: (cards: any[]) => void }>} ContextType
 * @type ContextType
 */
declare const CubeContext: React.Context<{
    cube: any;
    canEdit: boolean;
    cubeID: string | null;
    hasCustomImages: boolean;
    setCube: ((cube: any) => void) | ((replacer: (cube: any) => any) => void);
    updateCubeCard: (index: number, card: any) => void;
    updateCubeCards: (cards: any[]) => void;
}>;
import React from "react";
//# sourceMappingURL=CubeContext.d.ts.map