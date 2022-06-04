export default useComment;
export type Comment = import('@cubeartisan/client/proptypes/CommentPropType.js').Comment;
/**
 * @typedef {import('@cubeartisan/client/proptypes/CommentPropType.js').Comment} Comment
 */
/**
 * @param {string} type
 * @param {string} parent
 * @returns {[Comment[], (content: string) => Promise<void>, boolean, (comment: Comment) => Promise<void>]} handles
 */
declare function useComment(type: string, parent: string): [import("@cubeartisan/client/proptypes/CommentPropType.js").Comment[], (content: string) => Promise<void>, boolean, (comment: Comment) => Promise<void>];
//# sourceMappingURL=UseComments.d.ts.map