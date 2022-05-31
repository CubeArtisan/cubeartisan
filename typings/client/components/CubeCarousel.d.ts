export default CubeCarousel;
declare function CubeCarousel({ cubes }: {
    cubes: any;
}): JSX.Element;
declare namespace CubeCarousel {
    namespace propTypes {
        const cubes: PropTypes.Validator<(PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeCarousel.d.ts.map