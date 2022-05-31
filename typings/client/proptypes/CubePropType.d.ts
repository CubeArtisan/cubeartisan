export default CubePropType;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type Cube = {
    cards: Card[];
};
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef Cube
 * @property {Card[]} cards
 */
declare const CubePropType: PropTypes.Requireable<PropTypes.InferProps<{
    cards: PropTypes.Requireable<(PropTypes.InferProps<{
        cardName: PropTypes.Requireable<string>;
        picks: PropTypes.Requireable<number>;
        passes: PropTypes.Requireable<number>;
        elo: PropTypes.Requireable<number>;
        mainboards: PropTypes.Requireable<number>;
        sideboards: PropTypes.Requireable<number>;
    }> | null | undefined)[]>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CubePropType.d.ts.map