export default CardPropType;
export type Card = {
    _id?: string;
    index?: number;
    imgUrl?: string;
    imgBackUrl?: string;
    cardID: string;
    colors?: import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color[];
    tags: string[];
    details: import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
};
/**
 * @typedef Card
 * @property {string} [_id]
 * @property {number} [index]
 * @property {string} [imgUrl]
 * @property {string} [imgBackUrl]
 * @property {string} cardID
 * @property {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color[]} [colors]
 * @property {string[]} tags
 * @property {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} details
 */
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