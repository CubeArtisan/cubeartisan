export default Podcast;
declare function Podcast({ podcast, episodes }: {
    podcast: any;
    episodes: any;
}): JSX.Element;
declare namespace Podcast {
    namespace propTypes {
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
        const episodes: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
    }
    namespace defaultProps {
        const episodes_1: any[];
        export { episodes_1 as episodes };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Podcast.d.ts.map