export function EditPodcastPage({ loginCallback, podcast }: {
    loginCallback: any;
    podcast: any;
}): JSX.Element;
export namespace EditPodcastPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const podcast: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            rss: PropTypes.Validator<string>;
            description: PropTypes.Validator<string>;
            date: PropTypes.Validator<string>;
            status: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            source: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            podcast: PropTypes.Validator<string>;
            podcastname: PropTypes.Validator<string>;
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
//# sourceMappingURL=EditPodcastPage.d.ts.map