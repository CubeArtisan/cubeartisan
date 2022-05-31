export function VideosPage({ loginCallback, videos, count, page }: {
    loginCallback: any;
    videos: any;
    count: any;
    page: any;
}): JSX.Element;
export namespace VideosPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const videos: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            body: PropTypes.Validator<string>;
            date: PropTypes.Validator<string>;
            status: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            url: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            short: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            imagename: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
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
//# sourceMappingURL=VideosPage.d.ts.map