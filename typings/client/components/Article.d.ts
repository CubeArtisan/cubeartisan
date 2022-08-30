export default Article;
declare function Article({ article }: {
    article: any;
}): JSX.Element;
declare namespace Article {
    namespace propTypes {
        const article: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
            _id: import("prop-types").Validator<string>;
            title: import("prop-types").Validator<string>;
            body: import("prop-types").Validator<string>;
            date: import("prop-types").Validator<string>;
            owner: import("prop-types").Validator<string>;
            username: import("prop-types").Validator<string>;
            status: import("prop-types").Validator<string>;
            short: import("prop-types").Validator<string>;
            artist: import("prop-types").Validator<string>;
            image: import("prop-types").Validator<string>;
            imagename: import("prop-types").Validator<string>;
        }>>>;
    }
}
//# sourceMappingURL=Article.d.ts.map