export default Tooltip;
declare function Tooltip({ text, children, wrapperTag, tooltipProps, ...props }: {
    [x: string]: any;
    text: any;
    children: any;
    wrapperTag: any;
    tooltipProps: any;
}): JSX.Element;
declare namespace Tooltip {
    namespace propTypes {
        const text: PropTypes.Validator<string>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const wrapperTag: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const tooltipProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    }
    namespace defaultProps {
        const wrapperTag_1: string;
        export { wrapperTag_1 as wrapperTag };
        const tooltipProps_1: {};
        export { tooltipProps_1 as tooltipProps };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Tooltip.d.ts.map