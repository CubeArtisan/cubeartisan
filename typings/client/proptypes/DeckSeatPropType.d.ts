export default DeckSeatPropType;
export type DeckSeat = {
    description: string;
    deck: number[][][];
    sideboard: number[][][];
    username: string;
    userid: string | null;
    bot: boolean;
    name: string;
};
declare const DeckSeatPropType: PropTypes.Requireable<PropTypes.InferProps<{
    description: PropTypes.Validator<string>;
    deck: PropTypes.Validator<(number | null | undefined)[][][]>;
    sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
    username: PropTypes.Validator<string>;
    userid: PropTypes.Requireable<string>;
    bot: PropTypes.Validator<boolean>;
    name: PropTypes.Validator<string>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=DeckSeatPropType.d.ts.map