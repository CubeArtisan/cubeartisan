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
export type ThemeType = 'default' | 'dark';
export type DisplayContextValue = import('react').Context<DisplayContextValue>;
import PropTypes from "prop-types";
/**
 * @typedef {'default' | 'dark'} ThemeType
 * @typedef DisplayContextValue
 * @property {boolean} showCustomImages
 * @property {() => void} toggleShowCustomImages
 * @property {boolean} showMaybeboard
 * @property {() => void} toggleShowMaybeboard
 * @property {number} cardsInRow
 * @property {(cardsInRow: number) => void} setCardsInRow
 * @property {boolean} useSticky
 * @property {() => void} toggleUseSticky
 * @property {ThemeType} theme
 * @property {(theme?: ThemeType) => void} updateTheme
 * @property {number | string} autoCardSize
 * @property {(size: number | string) => void} setAutoCardSize
 * @type {import('react').Context<DisplayContextValue>}
 */
declare const DisplayContext: React.Context<{
    showCustomImages: boolean;
    toggleShowCustomImages: () => void;
    showMaybeboard: boolean;
    toggleShowMaybeboard: () => void;
    cardsInRow: number;
    setCardsInRow: () => void;
    useSticky: boolean;
    toggleUseSticky: () => void;
    theme: string;
    updateTheme: () => void;
    autoCardSize: string;
    setAutoCardSize: () => void;
}>;
import React from "react";
//# sourceMappingURL=DisplayContext.d.ts.map