export function RegisterPage({ username, email, loginCallback }: {
    username: any;
    email: any;
    loginCallback: any;
}): JSX.Element;
export namespace RegisterPage {
    namespace propTypes {
        const email: PropTypes.Requireable<string>;
        const username: PropTypes.Requireable<string>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
        const email_1: string;
        export { email_1 as email };
        const username_1: string;
        export { username_1 as username };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=RegisterPage.d.ts.map