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
        const title: any;
        const requestId: any;
        const error: any;
        const loginCallback: any;
        const siteCustomizations: any;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
        const requestId_1: any;
        export { requestId_1 as requestId };
        const error_1: any;
        export { error_1 as error };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
//# sourceMappingURL=ErrorPage.d.ts.map