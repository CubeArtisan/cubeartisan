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
        const comment: PropTypes.Validator<PropTypes.InferProps<{
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
        }>>;
        const index: PropTypes.Validator<number>;
        const depth: PropTypes.Requireable<number>;
        const noReplies: PropTypes.Requireable<boolean>;
        const editComment: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const depth_1: number;
        export { depth_1 as depth };
        const noReplies_1: boolean;
        export { noReplies_1 as noReplies };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Comment.d.ts.map