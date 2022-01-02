export default CubeSearchNavBar;
declare function CubeSearchNavBar({ query, order, title }: {
    query: any;
    order: any;
    title: any;
}): JSX.Element;
declare namespace CubeSearchNavBar {
    namespace propTypes {
        const query: PropTypes.Requireable<string>;
        const order: PropTypes.Requireable<string>;
        const title: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const title_1: any;
        export { title_1 as title };
        const query_1: string;
        export { query_1 as query };
        const order_1: string;
        export { order_1 as order };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeSearchNavBar.d.ts.map