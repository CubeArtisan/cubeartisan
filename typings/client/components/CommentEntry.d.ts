export default CommentEntry;
export type CommentEntryProps = {
    submit: (text: string) => void;
    expanded: boolean;
    toggle: () => void;
    defaultValue?: string | null | undefined;
};
/**
 * @typedef CommentEntryProps
 * @property {(text: string) => void} submit
 * @property {boolean} expanded
 * @property {() => void} toggle
 * @property {string?} [defaultValue]
 */
/**
 * @type {React.FC<CommentEntryProps>}
 */
declare const CommentEntry: React.FC<CommentEntryProps>;
//# sourceMappingURL=CommentEntry.d.ts.map