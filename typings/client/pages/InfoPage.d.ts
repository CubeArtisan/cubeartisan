export function ContactPage({ title, content, loginCallback }: {
    title: any;
    content: any;
    loginCallback: any;
}): JSX.Element;
export namespace ContactPage {
    namespace propTypes {
        const title: PropTypes.Validator<string>;
        const content: PropTypes.Validator<(PropTypes.InferProps<{
            label: PropTypes.Validator<string>;
            text: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=InfoPage.d.ts.map