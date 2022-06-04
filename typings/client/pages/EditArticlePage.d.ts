export function EditArticlePage({ loginCallback, article, siteCustomizations }: {
    loginCallback: any;
    article: any;
    siteCustomizations: any;
}): JSX.Element;
export namespace EditArticlePage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const article: PropTypes.Validator<PropTypes.InferProps<{
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
        }>>;
        const siteCustomizations: PropTypes.Validator<PropTypes.InferProps<{
            discordUrl: PropTypes.Validator<string>;
            siteName: PropTypes.Validator<string>;
            sourceRepo: PropTypes.Validator<string>;
            supportEmail: PropTypes.Validator<string>;
        }>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=EditArticlePage.d.ts.map