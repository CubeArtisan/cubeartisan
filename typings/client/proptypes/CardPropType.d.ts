export default CardPropType;
declare const CardPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Requireable<string>;
    index: PropTypes.Requireable<number>;
    imgUrl: PropTypes.Requireable<string>;
    imgBackUrl: PropTypes.Requireable<string>;
    cardID: PropTypes.Validator<string>;
    colors: PropTypes.Requireable<string[]>;
    tags: PropTypes.Requireable<string[]>;
    details: PropTypes.Requireable<PropTypes.InferProps<{
        _id: PropTypes.Validator<string>;
        name: PropTypes.Validator<string>;
        image_normal: PropTypes.Validator<string>;
    }>>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CardPropType.d.ts.map