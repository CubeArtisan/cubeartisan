export function roundNumber(value: any): any;
export function valueRenderer(value: any): JSX.Element;
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
        const data: PropTypes.Validator<NonNullable<PropTypes.InferProps<{}>>[]>;
        const defaultSortConfig: PropTypes.Requireable<PropTypes.InferProps<{
            key: PropTypes.Validator<string>;
            direction: PropTypes.Validator<string>;
        }>>;
        const sortFns: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const columnProps: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Validator<string>;
            key: PropTypes.Validator<string>;
            sortable: PropTypes.Requireable<boolean>;
            heading: PropTypes.Requireable<boolean>;
            tooltip: PropTypes.Requireable<string>;
            renderFunc: PropTypes.Requireable<(...args: any[]) => any>;
        }>>[]>;
        const totalRow: PropTypes.Requireable<boolean>;
        const totalCol: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const defaultSortConfig_1: null;
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
export type ColumnProps = {
    title: string;
    key: string;
    sortable?: boolean | undefined;
    heading?: boolean | undefined;
    tooltip?: string | null | undefined;
    renderFn?: ((value: any, row?: object, key?: string) => React.ReactNode) | undefined;
};
export type SortableTableProps<Data> = {
    data: Data[];
    defaultSortConfig: { [k in keyof Data]: "ascending" | "descending"; };
};
import PropTypes from "prop-types";
//# sourceMappingURL=SortableTable.d.ts.map