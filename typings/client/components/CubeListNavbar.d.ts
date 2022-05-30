export default CubeListNavbar;
declare function CubeListNavbar({ cards, cubeView, setCubeView, openCollapse, setOpenCollapse, defaultPrimarySort, defaultSecondarySort, defaultTertiarySort, defaultQuaternarySort, defaultShowUnsorted, sorts, setSorts, defaultSorts, cubeDefaultShowUnsorted, defaultFilterText, filter, setFilter, alerts, setAlerts, }: {
    cards: any;
    cubeView: any;
    setCubeView: any;
    openCollapse: any;
    setOpenCollapse: any;
    defaultPrimarySort: any;
    defaultSecondarySort: any;
    defaultTertiarySort: any;
    defaultQuaternarySort: any;
    defaultShowUnsorted: any;
    sorts: any;
    setSorts: any;
    defaultSorts: any;
    cubeDefaultShowUnsorted: any;
    defaultFilterText: any;
    filter: any;
    setFilter: any;
    alerts: any;
    setAlerts: any;
}): JSX.Element;
declare namespace CubeListNavbar {
    namespace propTypes {
        const cards: PropTypes.Validator<PropTypes.InferProps<{
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
        const cubeView: PropTypes.Validator<string>;
        const setCubeView: PropTypes.Validator<(...args: any[]) => any>;
        const openCollapse: PropTypes.Requireable<string>;
        const setOpenCollapse: PropTypes.Validator<(...args: any[]) => any>;
        const defaultPrimarySort: PropTypes.Validator<string>;
        const defaultSecondarySort: PropTypes.Validator<string>;
        const defaultTertiarySort: PropTypes.Validator<string>;
        const defaultQuaternarySort: PropTypes.Validator<string>;
        const defaultShowUnsorted: PropTypes.Validator<string>;
        const sorts: PropTypes.Requireable<string[]>;
        const setSorts: PropTypes.Validator<(...args: any[]) => any>;
        const defaultSorts: PropTypes.Validator<string[]>;
        const cubeDefaultShowUnsorted: PropTypes.Requireable<boolean>;
        const defaultFilterText: PropTypes.Validator<string>;
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
        const setFilter: PropTypes.Validator<(...args: any[]) => any>;
        const alerts: PropTypes.Validator<PropTypes.InferProps<{
            color: PropTypes.Requireable<string>;
            message: PropTypes.Validator<string>;
        }>[]>;
        const setAlerts: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const openCollapse_1: any;
        export { openCollapse_1 as openCollapse };
        const sorts_1: any;
        export { sorts_1 as sorts };
        const filter_1: any;
        export { filter_1 as filter };
        const cubeDefaultShowUnsorted_1: boolean;
        export { cubeDefaultShowUnsorted_1 as cubeDefaultShowUnsorted };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeListNavbar.d.ts.map