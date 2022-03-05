export default PodcastEpisodePreview;
declare function PodcastEpisodePreview({ episode }: {
    episode: any;
}): JSX.Element;
declare namespace PodcastEpisodePreview {
    namespace propTypes {
        const episode: import("prop-types").Validator<import("prop-types").InferProps<{
            _id: import("prop-types").Validator<string>;
            title: import("prop-types").Validator<string>;
            rss: import("prop-types").Validator<string>;
            description: import("prop-types").Validator<string>;
            date: import("prop-types").Validator<string>;
            status: import("prop-types").Validator<string>;
            owner: import("prop-types").Validator<string>;
            source: import("prop-types").Validator<string>;
            username: import("prop-types").Validator<string>;
            image: import("prop-types").Validator<string>;
            podcast: import("prop-types").Validator<string>;
            podcastname: import("prop-types").Validator<string>;
        }>>;
    }
}
//# sourceMappingURL=PodcastEpisodePreview.d.ts.map