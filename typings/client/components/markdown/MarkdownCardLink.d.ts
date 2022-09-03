export default MarkdownCardLink;
declare function MarkdownCardLink({ name, cardID, dfc }: {
    name: any;
    cardID: any;
    dfc: any;
}): JSX.Element;
declare namespace MarkdownCardLink {
    namespace propTypes {
        const name: PropTypes.Validator<string>;
        const cardID: PropTypes.Requireable<string>;
        const dfc: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const dfc_1: boolean;
        export { dfc_1 as dfc };
        const cardID_1: null;
        export { cardID_1 as cardID };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=MarkdownCardLink.d.ts.map