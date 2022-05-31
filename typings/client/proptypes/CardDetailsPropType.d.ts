export default CardDetailsPropType;
export type Color = 'W' | 'U' | 'B' | 'R' | 'G';
export type CardDetails = {
    _id: string;
    name: string;
    image_normal: string;
    image_flip?: string | undefined;
    image_small?: string | undefined;
};
/**
 * @typedef {'W'|'U'|'B'|'R'|'G'} Color
 */
/**
 * @typedef CardDetails
 * @property {string} _id
 * @property {string} name
 * @property {string} image_normal
 * @property {string} [image_flip]
 * @property {string} [image_small]
 */
declare const CardDetailsPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
    name: PropTypes.Validator<string>;
    image_normal: PropTypes.Validator<string>;
    image_flip: PropTypes.Requireable<string>;
    image_small: PropTypes.Requireable<string>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CardDetailsPropType.d.ts.map