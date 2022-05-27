export function MarkdownPage({ loginCallback }: {
    loginCallback: any;
}): JSX.Element;
export namespace MarkdownPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const siteCustomizations: PropTypes.Validator<PropTypes.InferProps<{
            siteName: PropTypes.Validator<string>;
        }>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=MarkdownPage.d.ts.map