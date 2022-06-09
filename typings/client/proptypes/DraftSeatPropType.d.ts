export default DraftSeatPropType;
export type DraftSeat = {
    bot: boolean;
    name: string;
    userid: string | null;
    drafted: number[][][];
    sideboard: number[][][];
    pickorder: number[];
    trashorder: number[];
};
declare const DraftSeatPropType: PropTypes.Requireable<PropTypes.InferProps<{
    bot: PropTypes.Validator<boolean>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=DraftSeatPropType.d.ts.map