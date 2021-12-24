export function DisplayContextProvider({ cubeID, defaultNumCols, ...props }: {
    [x: string]: any;
    cubeID: any;
    defaultNumCols: any;
}): JSX.Element;
export namespace DisplayContextProvider {
    namespace propTypes {
        const cubeID: PropTypes.Requireable<string>;
        const defaultNumCols: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const cubeID_1: string;
        export { cubeID_1 as cubeID };
        const defaultNumCols_1: number;
        export { defaultNumCols_1 as defaultNumCols };
    }
}
export default DisplayContext;
import PropTypes from "prop-types";
declare const DisplayContext: React.Context<{
    showCustomImages: boolean;
    compressedView: boolean;
    showMaybeboard: boolean;
    cardsInRow: number;
    useSticky: boolean;
    theme: string;
}>;
import React from "react";
//# sourceMappingURL=DisplayContext.d.ts.map