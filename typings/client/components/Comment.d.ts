export default Comment;
declare function Comment({ comment, index, depth, noReplies, editComment }: {
    comment: any;
    index: any;
    depth: any;
    noReplies: any;
    editComment: any;
}): JSX.Element;
declare namespace Comment {
    namespace propTypes {
        const comment: any;
        const index: any;
        const depth: any;
        const noReplies: any;
        const editComment: any;
    }
    namespace defaultProps {
        const depth_1: number;
        export { depth_1 as depth };
        const noReplies_1: boolean;
        export { noReplies_1 as noReplies };
    }
}
//# sourceMappingURL=Comment.d.ts.map