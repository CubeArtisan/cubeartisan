export function LeaveWarningPage({ url, loginCallback, siteCustomizations: { siteName } }: {
    url: any;
    loginCallback: any;
    siteCustomizations: {
        siteName: any;
    };
}): JSX.Element;
export namespace LeaveWarningPage {
    namespace propTypes {
        const url: PropTypes.Validator<string>;
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
//# sourceMappingURL=LeaveWarningPage.d.ts.map