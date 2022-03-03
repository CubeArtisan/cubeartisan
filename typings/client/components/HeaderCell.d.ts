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
        const label: any;
        const fieldName: any;
        const sortConfig: any;
        const requestSort: any;
        const tooltip: any;
    }
    namespace defaultProps {
        const tooltip_1: any;
        export { tooltip_1 as tooltip };
        const sortConfig_1: any;
        export { sortConfig_1 as sortConfig };
    }
}
//# sourceMappingURL=HeaderCell.d.ts.map