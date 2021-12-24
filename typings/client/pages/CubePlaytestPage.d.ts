export function CubePlaytestPage({ cube, decks, loginCallback }: {
    cube: any;
    decks: any;
    loginCallback: any;
}): JSX.Element;
export namespace CubePlaytestPage {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<object[]>;
            defaultDraftFormat: PropTypes.Requireable<number>;
            _id: PropTypes.Validator<string>;
            shortID: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            draft_formats: PropTypes.Requireable<PropTypes.InferProps<{
                title: PropTypes.Requireable<string>;
                multiples: PropTypes.Requireable<boolean>;
                markdown: PropTypes.Validator<string>;
                defaultSeats: PropTypes.Requireable<number>;
                packs: PropTypes.Validator<PropTypes.InferProps<{
                    slots: PropTypes.Validator<string[]>;
                    steps: PropTypes.Requireable<PropTypes.InferProps<{
                        action: PropTypes.Requireable<string>;
                        amount: PropTypes.Requireable<number>;
                    }>[]>;
                }>[]>;
            }>[]>;
        }>>;
        const decks: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<number[][][]>;
                sideboard: PropTypes.Validator<number[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<string[]>;
                name: PropTypes.Validator<string>;
            }>[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<object[]>;
            basics: PropTypes.Validator<number[]>;
        }>[]>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CubePlaytestPage.d.ts.map