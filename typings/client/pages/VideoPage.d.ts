export function VideoPage({ loginCallback, video }: {
    loginCallback: any;
    video: any;
}): JSX.Element;
export namespace VideoPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const video: PropTypes.Validator<PropTypes.InferProps<{
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
        }>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=VideoPage.d.ts.map