export function DraftbotBreakdownTable({ drafterState }: {
    drafterState: any;
}): JSX.Element;
export namespace DraftbotBreakdownTable {
    namespace propTypes {
        const drafterState: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Validator<PropTypes.InferProps<{
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
            }>[]>;
            picked: PropTypes.Validator<number[]>;
            trashed: PropTypes.Validator<number[]>;
            seen: PropTypes.Requireable<number[]>;
            cardsInPack: PropTypes.Validator<number[]>;
            packNum: PropTypes.Validator<number>;
            pickNum: PropTypes.Validator<number>;
            numPacks: PropTypes.Validator<number>;
            packSize: PropTypes.Validator<number>;
            pickedNum: PropTypes.Validator<number>;
            trashedNum: PropTypes.Validator<number>;
            stepNumber: PropTypes.Validator<number>;
            pickNumber: PropTypes.Validator<number>;
            step: PropTypes.Requireable<PropTypes.InferProps<{
                action: PropTypes.Validator<string>;
                amount: PropTypes.Requireable<number>;
            }>>;
        }>>;
    }
}
export default DraftbotBreakdown;
import PropTypes from "prop-types";
declare function DraftbotBreakdown(props: any): JSX.Element;
declare namespace DraftbotBreakdown {
    export namespace propTypes_1 {
        const draft: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            basics: PropTypes.Validator<number[]>;
            cards: PropTypes.Validator<PropTypes.InferProps<{
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
            }>[]>;
            cube: PropTypes.Validator<string>;
            initial_state: PropTypes.Validator<PropTypes.InferProps<{
                cards: PropTypes.Validator<number[]>;
                steps: PropTypes.Requireable<PropTypes.InferProps<{
                    action: PropTypes.Validator<string>;
                    amount: PropTypes.Requireable<number>;
                }>[]>;
            }>[][]>;
            seats: PropTypes.Validator<PropTypes.InferProps<{
                bot: PropTypes.Requireable<boolean>;
                name: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                drafted: PropTypes.Validator<number[][][]>;
                sideboard: PropTypes.Validator<number[][][]>;
                pickorder: PropTypes.Validator<number[]>;
                trashorder: PropTypes.Validator<number[]>;
            }>[]>;
        }>>;
        const seatIndex: PropTypes.Validator<string | number>;
        const defaultIndex: PropTypes.Requireable<number>;
    }
    export { propTypes_1 as propTypes };
    export namespace defaultProps {
        const defaultIndex_1: number;
        export { defaultIndex_1 as defaultIndex };
    }
}
//# sourceMappingURL=DraftbotBreakdown.d.ts.map