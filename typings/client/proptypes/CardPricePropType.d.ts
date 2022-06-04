export default CardPricePropType;
export type CardPrices = {
    usd: number | null;
    usd_foil: number | null;
    eur: number | null;
    tix: number | null;
};
/**
 * @typedef CardPrices
 * @property {number?} usd
 * @property {number?} usd_foil
 * @property {number?} eur
 * @property {number?} tix
 */
declare const CardPricePropType: PropTypes.Requireable<PropTypes.InferProps<{
    usd: PropTypes.Requireable<number>;
    usd_foil: PropTypes.Requireable<number>;
    eur: PropTypes.Requireable<number>;
    tix: PropTypes.Requireable<number>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CardPricePropType.d.ts.map