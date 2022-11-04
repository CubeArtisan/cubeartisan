export default DraftPropType;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type Step = import('@cubeartisan/client/proptypes/CubePropType.js').Step;
export type DraftSeat = import('@cubeartisan/client/proptypes/DraftSeatPropType.js').DraftSeat;
export type DraftPack = {
    cards: number[];
    steps: Step[] | null;
};
export type Draft = {
    _id: string;
    basics: number[];
    cards: Card[];
    cube: string;
    initial_state: DraftPack[][];
    schemaVersion: number;
    seats: DraftSeat[];
    seed: string;
    timeout: number;
    cas: number;
};
declare const DraftPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=DraftPropType.d.ts.map