export default Comment;
export type Comment = import('@cubeartisan/client/proptypes/CommentPropType.js').Comment;
export type CommentProps = {
    comment: Comment;
    index: number;
    depth?: number | undefined;
    noReplies?: boolean | undefined;
    editComment: (comment: Comment) => void;
};
/**
 * @typedef {import('@cubeartisan/client/proptypes/CommentPropType.js').Comment} Comment
 */
/**
 * @typedef CommentProps
 * @property {Comment} comment
 * @property {number} index
 * @property {number} [depth]
 * @property {boolean} [noReplies]
 * @property {(comment: Comment) => void} editComment
 */
/**
 * @type React.FC<CommentProps>
 */
declare const Comment: React.FC<CommentProps>;
//# sourceMappingURL=Comment.d.ts.map