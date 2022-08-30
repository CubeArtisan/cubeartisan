export default MarkdownCardLink;
declare function MarkdownCardLink(props: any): JSX.Element;
declare namespace MarkdownCardLink {
    namespace propTypes {
        const name: PropTypes.Validator<string>;
        const cardID: PropTypes.Validator<string>;
        const dfc: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const dfc_1: boolean;
        export { dfc_1 as dfc };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=MarkdownCardLink.d.ts.map