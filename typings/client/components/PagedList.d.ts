export default PagedList;
declare function PagedList({ pageSize, rows, showBottom, pageWrap }: {
    pageSize: any;
    rows: any;
    showBottom: any;
    pageWrap: any;
}): JSX.Element;
declare namespace PagedList {
    namespace propTypes {
        const pageSize: PropTypes.Requireable<number>;
        const showBottom: PropTypes.Requireable<boolean>;
        const rows: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const pageWrap: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const pageSize_1: number;
        export { pageSize_1 as pageSize };
        const showBottom_1: boolean;
        export { showBottom_1 as showBottom };
        export function pageWrap_1(element: any): any;
        export { pageWrap_1 as pageWrap };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PagedList.d.ts.map