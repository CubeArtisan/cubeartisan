export function valueRenderer(value: any): any;
export function percentRenderer(value: any): JSX.Element;
export function compareStrings(a: any, b: any): any;
export function SortableTable({ data, defaultSortConfig, sortFns, columnProps, totalRow, totalCol, ...props }: {
    [x: string]: any;
    data: any;
    defaultSortConfig: any;
    sortFns: any;
    columnProps: any;
    totalRow: any;
    totalCol: any;
}): JSX.Element;
export namespace SortableTable {
    namespace propTypes {
        const data: any;
        const defaultSortConfig: any;
        const sortFns: any;
        const columnProps: any;
        const totalRow: any;
        const totalCol: any;
    }
    namespace defaultProps {
        const defaultSortConfig_1: any;
        export { defaultSortConfig_1 as defaultSortConfig };
        const sortFns_1: {};
        export { sortFns_1 as sortFns };
        const totalRow_1: boolean;
        export { totalRow_1 as totalRow };
        const totalCol_1: boolean;
        export { totalCol_1 as totalCol };
    }
}
export default SortableTable;
//# sourceMappingURL=SortableTable.d.ts.map