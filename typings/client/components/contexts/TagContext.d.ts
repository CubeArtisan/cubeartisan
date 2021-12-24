export function getCardColorClass(card: any): any;
export function getCardTagColorClass(tagColors: any, card: any): any;
export function getTagColorClass(tagColors: any, tag: any): string;
export const TAG_COLORS: string[][];
export function TagContextProvider({ children, cubeID, defaultTagColors, defaultShowTagColors, defaultTags, userID, }: {
    children: any;
    cubeID: any;
    defaultTagColors: any;
    defaultShowTagColors: any;
    defaultTags: any;
    userID: any;
}): JSX.Element;
export namespace TagContextProvider {
    namespace propTypes {
        const cubeID: PropTypes.Validator<string>;
        const defaultTagColors: PropTypes.Requireable<string[]>;
        const defaultShowTagColors: PropTypes.Requireable<boolean>;
        const defaultTags: PropTypes.Requireable<string[]>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const userID: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        const defaultTagColors_1: any[];
        export { defaultTagColors_1 as defaultTagColors };
        const defaultShowTagColors_1: boolean;
        export { defaultShowTagColors_1 as defaultShowTagColors };
        const defaultTags_1: any[];
        export { defaultTags_1 as defaultTags };
    }
}
export default TagContext;
import PropTypes from "prop-types";
declare const TagContext: React.Context<{
    addSuggestion: () => void;
    allSuggestions: any[];
}>;
import React from "react";
//# sourceMappingURL=TagContext.d.ts.map