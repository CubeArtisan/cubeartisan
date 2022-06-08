export function ErrorPage({ title, error, requestId, loginCallback, siteCustomizations: { discordUrl, siteName } }: {
    title: any;
    error: any;
    requestId: any;
    loginCallback: any;
    siteCustomizations: {
        discordUrl: any;
        siteName: any;
    };
}): JSX.Element;
export namespace ErrorPage {
    namespace propTypes {
        const title: PropTypes.Validator<string>;
        const requestId: PropTypes.Requireable<string>;
        const error: PropTypes.Requireable<string>;
        const loginCallback: PropTypes.Requireable<string>;
        const siteCustomizations: PropTypes.Validator<PropTypes.InferProps<{
            discordUrl: PropTypes.Validator<string>;
            siteName: PropTypes.Validator<string>;
        }>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
        const requestId_1: null;
        export { requestId_1 as requestId };
        const error_1: null;
        export { error_1 as error };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=ErrorPage.d.ts.map