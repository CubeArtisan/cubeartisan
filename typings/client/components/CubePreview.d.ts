export default CubePreview;
declare function CubePreview({ cube }: {
    cube: any;
}): JSX.Element;
declare namespace CubePreview {
    namespace propTypes {
        const cube: import("prop-types").Validator<import("prop-types").InferProps<{
            cards: import("prop-types").Requireable<import("prop-types").InferProps<{
                cardName: import("prop-types").Requireable<string>;
                picks: import("prop-types").Requireable<number>;
                passes: import("prop-types").Requireable<number>;
                elo: import("prop-types").Requireable<number>;
                mainboards: import("prop-types").Requireable<number>;
                sideboards: import("prop-types").Requireable<number>;
            }>[]>;
            useCubeElo: import("prop-types").Requireable<boolean>;
        }>>;
    }
}
//# sourceMappingURL=CubePreview.d.ts.map