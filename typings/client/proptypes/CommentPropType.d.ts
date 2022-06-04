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
/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} timePosted
 * @property {string} ownerName
 * @property {string?} owner
 * @property {string} parent
 * @property {string} parentType
 * @property {string} artist
 * @property {string} image
 * @property {string} content
 * @property {boolean} updated
 */
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