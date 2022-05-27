export default HeaderFooter;
declare function HeaderFooter({ children, component: Component, sx, ...props }: {
    [x: string]: any;
    children: any;
    component: any;
    sx: any;
}): JSX.Element;
declare namespace HeaderFooter {
    namespace propTypes {
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const component: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    }
    namespace defaultProps {
        export { Box as component };
        const sx_1: {};
        export { sx_1 as sx };
    }
}
import PropTypes from "prop-types";
import { Box } from "@mui/material";
//# sourceMappingURL=HeaderFooter.d.ts.map