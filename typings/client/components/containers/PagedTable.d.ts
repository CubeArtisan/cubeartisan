export default PagedTable;
declare function PagedTable({ pageSize, rows, children, ...props }: {
    [x: string]: any;
    pageSize: any;
    rows: any;
    children: any;
}): JSX.Element;
declare namespace PagedTable {
    namespace propTypes {
        const children: PropTypes.Validator<PropTypes.ReactElementLike>;
        const pageSize: PropTypes.Requireable<number>;
        const rows: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
    }
    namespace defaultProps {
        const pageSize_1: number;
        export { pageSize_1 as pageSize };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PagedTable.d.ts.map