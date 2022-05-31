export default SpoilerImage;
declare function SpoilerImage({ card }: {
    card: any;
}): JSX.Element;
declare namespace SpoilerImage {
    namespace propTypes {
        const card: import("prop-types").Validator<import("prop-types").InferProps<{
            _id: import("prop-types").Requireable<string>;
            index: import("prop-types").Requireable<number>;
            imgUrl: import("prop-types").Requireable<string>;
            imgBackUrl: import("prop-types").Requireable<string>;
            cardID: import("prop-types").Validator<string>;
            colors: import("prop-types").Requireable<(string | null | undefined)[]>;
            tags: import("prop-types").Requireable<(string | null | undefined)[]>;
            details: import("prop-types").Requireable<import("prop-types").InferProps<{
                _id: import("prop-types").Validator<string>;
                name: import("prop-types").Validator<string>;
                image_normal: import("prop-types").Validator<string>;
            }>>;
        }>>;
    }
}
//# sourceMappingURL=SpoilerImage.d.ts.map