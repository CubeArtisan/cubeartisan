export function BlogPostPage({ post, loginCallback }: {
    post: any;
    loginCallback: any;
}): JSX.Element;
export namespace BlogPostPage {
    namespace propTypes {
        const post: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            date: PropTypes.Validator<Date>;
            cube: PropTypes.Validator<string>;
            markdown: PropTypes.Validator<string>;
            dev: PropTypes.Validator<string>;
            date_formatted: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            cubename: PropTypes.Validator<string>;
        }>>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=BlogPostPage.d.ts.map