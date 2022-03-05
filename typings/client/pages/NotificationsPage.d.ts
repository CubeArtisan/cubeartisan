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
        const notifications: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
        }>[]>;
        const loginCallback: PropTypes.Requireable<string>;
        const siteCustomizations: PropTypes.Validator<PropTypes.InferProps<{
            discordUrl: PropTypes.Validator<string>;
            siteName: PropTypes.Validator<string>;
        }>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=NotificationsPage.d.ts.map