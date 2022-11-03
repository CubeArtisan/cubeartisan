export default MarkdownCardImage;
declare function MarkdownCardImage({ id, dfc }: {
    id: any;
    dfc: any;
}): JSX.Element;
declare namespace MarkdownCardImage {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const dfc: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const dfc_1: boolean;
        export { dfc_1 as dfc };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=MarkdownCardImage.d.ts.map