export default useComment;
export type Comment = import('@cubeartisan/client/proptypes/CommentPropType.js').Comment;
declare function useComment(type: string, parent: string): [import("@cubeartisan/client/proptypes/CommentPropType.js").Comment[], (content: string) => Promise<void>, boolean, (comment: Comment) => Promise<void>];
//# sourceMappingURL=UseComments.d.ts.map