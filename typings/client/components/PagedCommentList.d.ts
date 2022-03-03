export default CommentList;
declare function CommentList({ comments, startIndex, editComment }: {
    comments: any;
    startIndex: any;
    editComment: any;
}): JSX.Element;
declare namespace CommentList {
    namespace propTypes {
        const comments: any;
        const startIndex: any;
        const editComment: any;
    }
    namespace defaultProps {
        const startIndex_1: number;
        export { startIndex_1 as startIndex };
    }
}
//# sourceMappingURL=PagedCommentList.d.ts.map