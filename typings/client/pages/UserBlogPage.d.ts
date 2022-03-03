export function UserBlogPage({ followers, following, posts, owner, loginCallback, pages, activePage }: {
    followers: any;
    following: any;
    posts: any;
    owner: any;
    loginCallback: any;
    pages: any;
    activePage: any;
}): JSX.Element;
export namespace UserBlogPage {
    namespace propTypes {
        const owner: any;
        const followers: any;
        const following: any;
        const posts: any;
        const pages: any;
        const activePage: any;
        const loginCallback: any;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
//# sourceMappingURL=UserBlogPage.d.ts.map