export function PodcastPage({ loginCallback, podcast, episodes }: {
    loginCallback: any;
    podcast: any;
    episodes: any;
}): JSX.Element;
export namespace PodcastPage {
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
        const episodes: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=PodcastPage.d.ts.map