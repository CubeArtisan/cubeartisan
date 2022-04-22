export default CardDetailsPropType;
export type Color = 'W' | 'U' | 'B' | 'R' | 'G';
export type CardDetails = {
    _id: string;
    name: string;
    image_normal: string;
};
/**
 * @typedef {'W'|'U'|'B'|'R'|'G'} Color
 */
/**
 * @typedef CardDetails
 * @property {string} _id
 * @property {string} name
 * @property {string} image_normal
 */
declare const CardDetailsPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
    name: PropTypes.Validator<string>;
    image_normal: PropTypes.Validator<string>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CardDetailsPropType.d.ts.map