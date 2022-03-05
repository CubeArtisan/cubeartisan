export default CommentsSection;
declare function CommentsSection({ parent, parentType, collapse }: {
    parent: any;
    parentType: any;
    collapse: any;
}): JSX.Element;
declare namespace CommentsSection {
    namespace propTypes {
        const parent: PropTypes.Validator<string>;
        const parentType: PropTypes.Validator<string>;
        const collapse: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const collapse_1: boolean;
        export { collapse_1 as collapse };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CommentsSection.d.ts.map