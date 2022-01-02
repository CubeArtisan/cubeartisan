export default BlogDeleteModal;
declare function BlogDeleteModal({ isOpen, toggle, postID, cubeID }: {
    isOpen: any;
    toggle: any;
    postID: any;
    cubeID: any;
}): JSX.Element;
declare namespace BlogDeleteModal {
    namespace propTypes {
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const postID: PropTypes.Validator<string>;
        const isOpen: PropTypes.Validator<boolean>;
        const cubeID: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=BlogDeleteModal.d.ts.map