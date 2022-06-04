export function VersionPage({ version, host, loginCallback }: {
    version: any;
    host: any;
    loginCallback: any;
}): JSX.Element;
export namespace VersionPage {
    namespace propTypes {
        const version: PropTypes.Validator<string>;
        const host: PropTypes.Validator<string>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=VersionPage.d.ts.map