export function DisplayContextProvider({ cubeID, defaultNumCols, ...props }: {
    [x: string]: any;
    cubeID: any;
    defaultNumCols: any;
}): JSX.Element;
export namespace DisplayContextProvider {
    namespace propTypes {
        const cubeID: any;
        const defaultNumCols: any;
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
};
export type ContextType = any;
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
 */
/**
 * @typedef {import('react').Context<DisplayContextValue>} ContextType
 * @type ContextType
 */
declare const DisplayContext: any;
//# sourceMappingURL=DisplayContext.d.ts.map