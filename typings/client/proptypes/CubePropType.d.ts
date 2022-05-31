export default CubePropType;
declare const CubePropType: PropTypes.Requireable<PropTypes.InferProps<{
    cards: PropTypes.Requireable<(PropTypes.InferProps<{
        cardName: PropTypes.Requireable<string>;
        picks: PropTypes.Requireable<number>;
        passes: PropTypes.Requireable<number>;
        elo: PropTypes.Requireable<number>;
        mainboards: PropTypes.Requireable<number>;
        sideboards: PropTypes.Requireable<number>;
    }> | null | undefined)[]>;
    useCubeElo: PropTypes.Requireable<boolean>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CubePropType.d.ts.map