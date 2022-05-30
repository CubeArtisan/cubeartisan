export function getCardColorClass(card: any): any;
export function getCardTagColorClass(tagColors: any, card: any): any;
export function getTagColorClass(tagColors: TagColor[], tag: string): string;
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
        const defaultTagColors: PropTypes.Requireable<PropTypes.InferProps<{
            tag: PropTypes.Requireable<string>;
            color: PropTypes.Requireable<string>;
        }>[]>;
        const defaultShowTagColors: PropTypes.Requireable<boolean>;
        const defaultTags: PropTypes.Requireable<PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<string>;
        }>[]>;
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
export type TagColor = {
    tag: string;
    color: string;
};
export type TagContextValues = {
    allSuggestions: string[];
    addSuggestion: (tag: string) => void;
    allTags: string[];
    tagColors: TagColor[];
    setTagColors: (colors: TagColor[]) => Promise<void>;
    showTagColors: boolean;
    setShowTagColors: (showTagColors: boolean) => Promise<void>;
    cardColorClass: (card: any) => string;
    tagColorClass: (tag: string) => string;
};
import PropTypes from "prop-types";
/**
 * @typedef TagContextValues
 * @property {string[]} allSuggestions
 * @property {(tag: string) => void} addSuggestion
 * @property {string[]} allTags
 * @property {TagColor[]} tagColors
 * @property {(colors: TagColor[]) => Promise<void>} setTagColors
 * @property {boolean} showTagColors
 * @property {(showTagColors: Boolean) => Promise<void>} setShowTagColors
 * @property {(card: any) => string} cardColorClass
 * @property {(tag: string) => string} tagColorClass
 */
/**
 * @type {import('react').Context<TagContextValues>}
 */
declare const TagContext: import('react').Context<TagContextValues>;
//# sourceMappingURL=TagContext.d.ts.map