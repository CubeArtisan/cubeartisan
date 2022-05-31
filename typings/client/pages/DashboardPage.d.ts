export function DashboardPage({ posts, cubes, decks, loginCallback, content }: {
    posts: any;
    cubes: any;
    decks: any;
    loginCallback: any;
    content: any;
}): JSX.Element;
export namespace DashboardPage {
    namespace propTypes {
        const posts: PropTypes.Validator<(PropTypes.InferProps<{
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
        }> | null | undefined)[]>;
        const cubes: PropTypes.Validator<(PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
        }> | null | undefined)[]>;
        const decks: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<(PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<(number | null | undefined)[][][]>;
                sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<(string | null | undefined)[]>;
                name: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
            basics: PropTypes.Validator<number[]>;
        }> | null | undefined)[]>;
        const content: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=DashboardPage.d.ts.map