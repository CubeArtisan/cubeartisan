export default HeaderCell;
declare function HeaderCell({ label, fieldName, sortConfig, requestSort, tooltip, ...props }: {
    [x: string]: any;
    label: any;
    fieldName: any;
    sortConfig: any;
    requestSort: any;
    tooltip: any;
}): JSX.Element;
declare namespace HeaderCell {
    namespace propTypes {
        const label: PropTypes.Validator<string>;
        const fieldName: PropTypes.Validator<string>;
        const sortConfig: PropTypes.Requireable<PropTypes.InferProps<{
            key: PropTypes.Validator<string>;
            direction: PropTypes.Validator<string>;
        }>>;
        const requestSort: PropTypes.Validator<(...args: any[]) => any>;
        const tooltip: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const tooltip_1: any;
        export { tooltip_1 as tooltip };
        const sortConfig_1: any;
        export { sortConfig_1 as sortConfig };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=HeaderCell.d.ts.map