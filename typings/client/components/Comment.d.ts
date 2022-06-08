export default Comment;
export type Comment = import('@cubeartisan/client/proptypes/CommentPropType.js').Comment;
export type CommentProps = {
    comment: Comment;
    index: number;
    depth?: number | undefined;
    noReplies?: boolean | undefined;
    editComment: (comment: Comment) => void;
};
declare const Comment: React.FC<CommentProps>;
//# sourceMappingURL=Comment.d.ts.map