export function CubeDeckPage({ cube, deck, draft, loginCallback }: {
    cube: any;
    deck: any;
    draft: any;
    loginCallback: any;
}): JSX.Element;
export namespace CubeDeckPage {
    namespace propTypes {
        export const cube: PropTypes.Validator<PropTypes.InferProps<{
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
        export const deck: PropTypes.Validator<PropTypes.InferProps<{
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
        }>>;
        export { DraftPropType as draft };
        export const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
        export const draft: any;
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
import { DraftPropType } from "@cubeartisan/client/proptypes/DraftbotPropTypes.js";
//# sourceMappingURL=CubeDeckPage.d.ts.map