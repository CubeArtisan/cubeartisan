export function usePickListAndDrafterState({ draft, seatIndex, defaultIndex }: {
    draft: any;
    seatIndex: any;
    defaultIndex: any;
}): {
    picksList: any[][];
    drafterState: {
        step: {
            action: any;
            amount: number;
        };
        cards: any;
        picked: any[];
        trashed: any[];
        drafted: any;
        sideboard: any;
        seatNum: number;
        seen: any[];
        cardsInPack: any[];
        basics: any;
        packNum: number;
        pickNum: number;
        numPacks: any;
        packSize: number;
        pickedNum: number;
        trashedNum: number;
        stepNumber: number;
        pickNumber: number;
        seed: number;
        timeout: any;
    };
    setPickNumberFromEvent: (event: any) => void;
};
export default DecksPickBreakdown;
declare function DecksPickBreakdown({ draft, ...props }: {
    [x: string]: any;
    draft: any;
}): JSX.Element;
declare namespace DecksPickBreakdown {
    namespace propTypes {
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
        const seatIndex: PropTypes.Validator<number>;
        const defaultIndex: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const defaultIndex_1: number;
        export { defaultIndex_1 as defaultIndex };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DecksPickBreakdown.d.ts.map