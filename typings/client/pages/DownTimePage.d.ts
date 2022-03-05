export function DownTimePage({ siteCustomizations: { discordUrl, siteName, supportEmail } }: {
    siteCustomizations: {
        discordUrl: any;
        siteName: any;
        supportEmail: any;
    };
}): JSX.Element;
export namespace DownTimePage {
    namespace propTypes {
        const siteCustomizations: PropTypes.Validator<PropTypes.InferProps<{
            discordUrl: PropTypes.Validator<string>;
            siteName: PropTypes.Validator<string>;
            supportEmail: PropTypes.Validator<string>;
        }>>;
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=DownTimePage.d.ts.map