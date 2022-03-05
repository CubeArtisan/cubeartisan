export default CardDataPointPropType;
declare const CardDataPointPropType: PropTypes.Requireable<PropTypes.InferProps<{
    prices: PropTypes.Validator<PropTypes.InferProps<{
        usd: PropTypes.Requireable<number>;
        usd_foil: PropTypes.Requireable<number>;
        eur: PropTypes.Requireable<number>;
        tix: PropTypes.Requireable<number>;
    }>[]>;
    vintage: PropTypes.Validator<boolean>;
    legacy: PropTypes.Validator<boolean>;
    modern: PropTypes.Validator<boolean>;
    standard: PropTypes.Validator<boolean>;
    pauper: PropTypes.Validator<boolean>;
    peasant: PropTypes.Validator<boolean>;
    size180: PropTypes.Validator<number>;
    size360: PropTypes.Validator<number>;
    size450: PropTypes.Validator<number>;
    size540: PropTypes.Validator<number>;
    size720: PropTypes.Validator<number>;
    total: PropTypes.Validator<number[]>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CardDataPointPropType.d.ts.map