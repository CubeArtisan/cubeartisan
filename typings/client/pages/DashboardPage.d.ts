export function DashboardPage({ posts, cubes, decks, loginCallback, content }: {
    posts: any;
    cubes: any;
    decks: any;
    loginCallback: any;
    content: any;
}): JSX.Element;
export namespace DashboardPage {
    namespace propTypes {
        const posts: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            date: PropTypes.Validator<Date>;
            cube: PropTypes.Validator<string>;
            markdown: PropTypes.Validator<string>;
            dev: PropTypes.Validator<string>;
            date_formatted: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            cubename: PropTypes.Validator<string>;
        }>[]>;
        const cubes: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>[]>;
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
            comments: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
            basics: PropTypes.Validator<number[]>;
        }>[]>;
        const content: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
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
//# sourceMappingURL=DashboardPage.d.ts.map