export function CubeComparePage({ cards, cube, cubeB, defaultTagColors, defaultShowTagColors, defaultSorts, loginCallback, ...props }: {
    [x: string]: any;
    cards: any;
    cube: any;
    cubeB: any;
    defaultTagColors: any;
    defaultShowTagColors: any;
    defaultSorts: any;
    loginCallback: any;
}): JSX.Element;
export namespace CubeComparePage {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            tags: PropTypes.Requireable<(string | null | undefined)[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }> | null | undefined)[]>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
        }>>;
        const cubeB: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
        }>>;
        const defaultTagColors: PropTypes.Validator<(PropTypes.InferProps<{
            tag: PropTypes.Validator<string>;
            color: PropTypes.Requireable<string | null>;
        }> | null | undefined)[]>;
        const defaultShowTagColors: PropTypes.Validator<boolean>;
        const defaultSorts: PropTypes.Validator<(string | null | undefined)[]>;
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
//# sourceMappingURL=CubeComparePage.d.ts.map