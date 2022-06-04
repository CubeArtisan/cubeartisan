export default CommentEntry;
export type CommentEntryProps = {
    submit: (text: string) => void;
    expanded: boolean;
    toggle: () => void;
    defaultValue?: string | null | undefined;
};
declare const CommentEntry: React.FC<CommentEntryProps>;
//# sourceMappingURL=CommentEntry.d.ts.map