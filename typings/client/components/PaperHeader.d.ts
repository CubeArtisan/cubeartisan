export default PaperHeader;
declare function PaperHeader({ title, variant, sx, children }: {
    title: any;
    variant: any;
    sx: any;
    children: any;
}): JSX.Element;
declare namespace PaperHeader {
    namespace propTypes {
        const title: PropTypes.Validator<string>;
        const variant: PropTypes.Requireable<string>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const variant_1: string;
        export { variant_1 as variant };
        const sx_1: {};
        export { sx_1 as sx };
        const children_1: any;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PaperHeader.d.ts.map