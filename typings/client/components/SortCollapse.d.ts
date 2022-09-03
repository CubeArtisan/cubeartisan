export default SortCollapse;
declare function SortCollapse({ defaultPrimarySort, defaultSecondarySort, defaultTertiarySort, defaultQuaternarySort, defaultShowUnsorted, defaultSorts, cubeDefaultShowUnsorted, setSorts, isOpen, ...props }: {
    [x: string]: any;
    defaultPrimarySort: any;
    defaultSecondarySort: any;
    defaultTertiarySort: any;
    defaultQuaternarySort: any;
    defaultShowUnsorted: any;
    defaultSorts: any;
    cubeDefaultShowUnsorted: any;
    setSorts: any;
    isOpen: any;
}): JSX.Element;
declare namespace SortCollapse {
    namespace propTypes {
        const defaultPrimarySort: PropTypes.Requireable<string>;
        const defaultSecondarySort: PropTypes.Requireable<string>;
        const defaultTertiarySort: PropTypes.Requireable<string>;
        const defaultQuaternarySort: PropTypes.Requireable<string>;
        const defaultShowUnsorted: PropTypes.Requireable<string>;
        const defaultSorts: PropTypes.Requireable<string[]>;
        const cubeDefaultShowUnsorted: PropTypes.Requireable<boolean>;
        const setSorts: PropTypes.Validator<(...args: any[]) => any>;
        const isOpen: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const defaultPrimarySort_1: string;
        export { defaultPrimarySort_1 as defaultPrimarySort };
        const defaultSecondarySort_1: string;
        export { defaultSecondarySort_1 as defaultSecondarySort };
        const defaultTertiarySort_1: string;
        export { defaultTertiarySort_1 as defaultTertiarySort };
        const defaultQuaternarySort_1: string;
        export { defaultQuaternarySort_1 as defaultQuaternarySort };
        const defaultShowUnsorted_1: string;
        export { defaultShowUnsorted_1 as defaultShowUnsorted };
        const defaultSorts_1: string[];
        export { defaultSorts_1 as defaultSorts };
        const cubeDefaultShowUnsorted_1: boolean;
        export { cubeDefaultShowUnsorted_1 as cubeDefaultShowUnsorted };
        const isOpen_1: boolean;
        export { isOpen_1 as isOpen };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=SortCollapse.d.ts.map