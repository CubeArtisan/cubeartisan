export default CommentPropType;
export type Comment = {
    _id: string;
    timePosted: string;
    ownerName: string;
    owner: string | null;
    parent: string;
    parentType: string;
    artist: string;
    image: string;
    content: string;
    updated: boolean;
};
declare const CommentPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
    timePosted: PropTypes.Validator<string>;
    ownerName: PropTypes.Validator<string>;
    owner: PropTypes.Requireable<string>;
    parent: PropTypes.Validator<string>;
    parentType: PropTypes.Validator<string>;
    artist: PropTypes.Validator<string>;
    image: PropTypes.Validator<string>;
    content: PropTypes.Validator<string>;
    updated: PropTypes.Validator<boolean>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CommentPropType.d.ts.map