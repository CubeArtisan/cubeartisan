export function RegisterPage({ username, email, loginCallback }: {
    username: any;
    email: any;
    loginCallback: any;
}): JSX.Element;
export namespace RegisterPage {
    namespace propTypes {
        const email: any;
        const username: any;
        const loginCallback: any;
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
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
//# sourceMappingURL=RegisterPage.d.ts.map