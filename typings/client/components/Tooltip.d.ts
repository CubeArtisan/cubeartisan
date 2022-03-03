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
        const text: any;
        const children: any;
        const wrapperTag: any;
        const tooltipProps: any;
    }
    namespace defaultProps {
        const wrapperTag_1: string;
        export { wrapperTag_1 as wrapperTag };
        const tooltipProps_1: {};
        export { tooltipProps_1 as tooltipProps };
    }
}
//# sourceMappingURL=Tooltip.d.ts.map