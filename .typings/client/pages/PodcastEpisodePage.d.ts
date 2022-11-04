export function PodcastEpisodePage({ loginCallback, episode }: {
    loginCallback: any;
    episode: any;
}): JSX.Element;
export namespace PodcastEpisodePage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const episode: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
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
        }>>>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=PodcastEpisodePage.d.ts.map