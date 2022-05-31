export default CommentList;
declare function CommentList({ comments, startIndex, editComment }: {
    comments: any;
    startIndex: any;
    editComment: any;
}): JSX.Element;
declare namespace CommentList {
    namespace propTypes {
        const comments: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            timePosted: PropTypes.Validator<string>;
            ownerName: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            parent: PropTypes.Validator<string>;
            parentType: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            content: PropTypes.Validator<string>;
            updated: PropTypes.Validator<boolean>;
        }> | null | undefined)[]>;
        const startIndex: PropTypes.Requireable<number>;
        const editComment: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const startIndex_1: number;
        export { startIndex_1 as startIndex };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PagedCommentList.d.ts.map