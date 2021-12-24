export function CubeContextProvider({ initialCube, canEdit, ...props }: {
    [x: string]: any;
    initialCube: any;
    canEdit: any;
}): JSX.Element;
export namespace CubeContextProvider {
    namespace propTypes {
        const initialCube: PropTypes.Requireable<PropTypes.InferProps<{
            cards: PropTypes.Requireable<object[]>;
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
import PropTypes from "prop-types";
declare const CubeContext: React.Context<{
    cube: {};
    canEdit: boolean;
    cubeID: any;
    hasCustomImages: boolean;
    updateCubeCard: () => void;
    updateCubeCards: () => void;
}>;
import React from "react";
//# sourceMappingURL=CubeContext.d.ts.map