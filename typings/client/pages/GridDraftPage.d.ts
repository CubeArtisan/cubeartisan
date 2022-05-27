export function GridDraftPage({ cube, initialDraft, seatNumber, loginCallback }: {
    cube: any;
    initialDraft: any;
    seatNumber: any;
    loginCallback: any;
}): JSX.Element;
export namespace GridDraftPage {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>>;
        const initialDraft: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Validator<PropTypes.InferProps<{
                cardID: PropTypes.Requireable<string>;
            }>[]>;
            _id: PropTypes.Requireable<string>;
            ratings: PropTypes.Requireable<{
                [x: string]: number;
            }>;
            initial_state: PropTypes.Validator<number[][]>;
            basics: PropTypes.Validator<number[]>;
            cube: PropTypes.Validator<string>;
            draftType: PropTypes.Validator<string>;
        }>>;
        const seatNumber: PropTypes.Requireable<number>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const seatNumber_1: number;
        export { seatNumber_1 as seatNumber };
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=GridDraftPage.d.ts.map