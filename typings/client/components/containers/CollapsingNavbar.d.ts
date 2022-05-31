export default CollapsingNavbar;
declare function CollapsingNavbar({ children, sx, breakpoint, component }: {
    children: any;
    sx: any;
    breakpoint: any;
    component: any;
}): JSX.Element;
declare namespace CollapsingNavbar {
    namespace propTypes {
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const breakpoint: PropTypes.Requireable<number>;
        const component: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    }
    namespace defaultProps {
        const sx_1: {};
        export { sx_1 as sx };
        const breakpoint_1: number;
        export { breakpoint_1 as breakpoint };
        const component_1: string;
        export { component_1 as component };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CollapsingNavbar.d.ts.map