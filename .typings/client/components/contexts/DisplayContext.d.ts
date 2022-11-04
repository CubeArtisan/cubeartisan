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
export type DisplayContextValue = {
    showCustomImages: boolean;
    toggleShowCustomImages: () => void;
    showMaybeboard: boolean;
    toggleShowMaybeboard: () => void;
    cardsInRow: number;
    setCardsInRow: (cardsInRow: number) => void;
    useSticky: boolean;
    toggleUseSticky: () => void;
    theme: string;
    updateTheme: (theme?: string) => void;
    autoCardSize: number | string;
    setAutoCardSize: (size: number | string) => void;
};
import PropTypes from "prop-types";
declare const DisplayContext: import("react").Context<{
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
//# sourceMappingURL=DisplayContext.d.ts.map