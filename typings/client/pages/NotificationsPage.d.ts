export function NotificationsPage({ notifications, loginCallback, siteCustomizations: { discordUrl, siteName } }: {
    notifications: any;
    loginCallback: any;
    siteCustomizations: {
        discordUrl: any;
        siteName: any;
    };
}): JSX.Element;
export namespace NotificationsPage {
    namespace propTypes {
        const notifications: any;
        const loginCallback: any;
        const siteCustomizations: any;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
//# sourceMappingURL=NotificationsPage.d.ts.map