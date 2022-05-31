export default CubeLayout;
declare function CubeLayout({ cube, activeLink, children }: {
    cube: any;
    activeLink: any;
    children: any;
}): JSX.Element;
declare namespace CubeLayout {
    namespace propTypes {
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
        const activeLink: PropTypes.Validator<string>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const children_1: boolean;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeLayout.d.ts.map