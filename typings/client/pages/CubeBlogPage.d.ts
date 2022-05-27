export function CubeBlogPage({ cube, pages, activePage, posts, loginCallback }: {
    cube: any;
    pages: any;
    activePage: any;
    posts: any;
    loginCallback: any;
}): JSX.Element;
export namespace CubeBlogPage {
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
        const pages: PropTypes.Validator<number>;
        const activePage: PropTypes.Validator<number>;
        const posts: PropTypes.Validator<PropTypes.InferProps<{
            markdown: PropTypes.Requireable<string>;
        }>[]>;
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
//# sourceMappingURL=CubeBlogPage.d.ts.map