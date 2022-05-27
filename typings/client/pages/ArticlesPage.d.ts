export function ArticlesPage({ loginCallback, articles, count, page }: {
    loginCallback: any;
    articles: any;
    count: any;
    page: any;
}): JSX.Element;
export namespace ArticlesPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const articles: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            body: PropTypes.Validator<string>;
            date: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            status: PropTypes.Validator<string>;
            short: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            imagename: PropTypes.Validator<string>;
        }>[]>;
        const count: PropTypes.Validator<number>;
        const page: PropTypes.Validator<number>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=ArticlesPage.d.ts.map