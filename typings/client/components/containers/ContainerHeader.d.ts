export default ContainerHeader;
declare function ContainerHeader({ title, variant, sx, children }: {
    title: any;
    variant: any;
    sx: any;
    children: any;
}): JSX.Element;
declare namespace ContainerHeader {
    namespace propTypes {
        const title: PropTypes.Requireable<string>;
        const variant: PropTypes.Requireable<string>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const title_1: null;
        export { title_1 as title };
        const variant_1: string;
        export { variant_1 as variant };
        const sx_1: {};
        export { sx_1 as sx };
        const children_1: null;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=ContainerHeader.d.ts.map