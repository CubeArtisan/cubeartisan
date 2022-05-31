export default DraftSeatPropType;
declare const DraftSeatPropType: PropTypes.Requireable<PropTypes.InferProps<{
    description: PropTypes.Validator<string>;
    deck: PropTypes.Validator<(number | null | undefined)[][][]>;
    sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
    username: PropTypes.Validator<string>;
    userid: PropTypes.Requireable<string>;
    bot: PropTypes.Requireable<(string | null | undefined)[]>;
    name: PropTypes.Validator<string>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=DraftSeatPropType.d.ts.map