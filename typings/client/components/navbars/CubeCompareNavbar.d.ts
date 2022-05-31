export default CubeCompareNavbar;
declare function CubeCompareNavbar({ cubeA, cubeB, cards, filter, setFilter, setOpenCollapse, openCollapse }: {
    cubeA: any;
    cubeB: any;
    cards: any;
    filter: any;
    setFilter: any;
    setOpenCollapse: any;
    openCollapse: any;
}): JSX.Element;
declare namespace CubeCompareNavbar {
    namespace propTypes {
        const setOpenCollapse: PropTypes.Validator<(...args: any[]) => any>;
        const openCollapse: PropTypes.Requireable<string>;
        const cubeA: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
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
            useCubeElo: PropTypes.Requireable<boolean>;
        }>>;
        const cards: PropTypes.Validator<PropTypes.InferProps<{
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
        }>[]>;
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
        const setFilter: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const openCollapse_1: null;
        export { openCollapse_1 as openCollapse };
        const filter_1: null;
        export { filter_1 as filter };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeCompareNavbar.d.ts.map