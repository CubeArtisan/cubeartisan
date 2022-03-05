export default Suspense;
declare function Suspense({ ...props }: {
    [x: string]: any;
}): JSX.Element;
declare namespace Suspense {
    namespace propTypes {
        const fallback: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const fallback_1: JSX.Element;
        export { fallback_1 as fallback };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Suspense.d.ts.map