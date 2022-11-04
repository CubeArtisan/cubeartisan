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
        const notifications: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
        }>>[]>;
        const loginCallback: PropTypes.Requireable<string>;
        const siteCustomizations: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            discordUrl: PropTypes.Validator<string>;
            siteName: PropTypes.Validator<string>;
        }>>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=NotificationsPage.d.ts.map