export function getCardColorClass(card: Card): string;
export function getCardTagColorClass(tagColors: TagColor[], card: Card): string;
export function getTagColorClass(tagColors: TagColor[], tag: string): string;
export const TAG_COLORS: (string | null)[][];
export const TagContextProvider: React.FC<TagContextProviderProps>;
export default TagContext;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type TagColor = {
    tag: string;
    color: string;
};
export type Tag = {
    id: number;
    text: string;
};
export type TagContextValues = {
    allSuggestions: Tag[];
    addSuggestion: (tag: Tag) => void;
    allTags: string[];
    tagColors: TagColor[];
    setTagColors: (colors: TagColor[]) => Promise<void>;
    showTagColors: boolean;
    setShowTagColors: (showTagColors: boolean) => Promise<void>;
    cardColorClass: (card: Card) => string;
    tagColorClass: (tag: string) => string;
};
export type TagContextProviderProps = {
    children: React.ReactNode;
    defaultShowTagColors?: boolean | null | undefined;
    defaultTagColors?: TagColor[] | null | undefined;
    defaultTags?: Tag[] | null | undefined;
    cubeID: string | null;
    userID: string | null;
};
declare const TagContext: import("react").Context<TagContextValues>;
//# sourceMappingURL=TagContext.d.ts.map