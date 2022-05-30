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
export type DisplayContextValue = {
    showCustomImages: boolean;
    toggleShowCustomImages: () => void;
    showMaybeboard: boolean;
    toggleShowMaybeboard: () => void;
    cardsInRow: number;
    setCardsInRow: (cardsInRow: number) => void;
    useSticky: boolean;
    toggleUseSticky: () => void;
    theme: ThemeType;
    updateTheme: (theme?: ThemeType) => void;
    autoCardSize: number | string;
    setAutoCardSize: (size: number | string) => void;
};
export type ContextType = import('react').Context<DisplayContextValue>;
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
 */
/**
 * @typedef {import('react').Context<DisplayContextValue>} ContextType
 * @type ContextType
 */
declare const DisplayContext: React.Context<DisplayContextValue>;
import React from "react";
//# sourceMappingURL=DisplayContext.d.ts.map