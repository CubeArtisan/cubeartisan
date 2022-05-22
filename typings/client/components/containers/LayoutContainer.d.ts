export function LayoutContainer({ children, sx }: {
    children: any;
    sx: any;
}): JSX.Element;
export namespace LayoutContainer {
    namespace propTypes {
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    }
    namespace defaultProps {
        const sx_1: {};
        export { sx_1 as sx };
    }
}
export default LayoutContainer;
import PropTypes from "prop-types";
import ContainerHeader from "@cubeartisan/client/components/containers/ContainerHeader.js";
import ContainerBody from "@cubeartisan/client/components/containers/ContainerBody.js";
import ContainerFooter from "@cubeartisan/client/components/containers/ContainerFooter.js";
export { ContainerHeader, ContainerBody, ContainerFooter };
//# sourceMappingURL=LayoutContainer.d.ts.map