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
        const owner: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
        }>>;
        const followers: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const following: PropTypes.Validator<boolean>;
        const posts: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const pages: PropTypes.Validator<number>;
        const activePage: PropTypes.Validator<number>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=UserBlogPage.d.ts.map