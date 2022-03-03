export default PagedTable;
declare function PagedTable({ pageSize, rows, children, ...props }: {
    [x: string]: any;
    pageSize: any;
    rows: any;
    children: any;
}): JSX.Element;
declare namespace PagedTable {
    namespace propTypes {
        const children: any;
        const pageSize: any;
        const rows: any;
    }
    namespace defaultProps {
        const pageSize_1: number;
        export { pageSize_1 as pageSize };
    }
}
//# sourceMappingURL=PagedTable.d.ts.map