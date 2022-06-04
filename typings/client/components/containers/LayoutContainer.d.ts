/**
 * @typedef {import('@mui/system').SxProps} SxProps
 * @typedef LayoutContainerProps
 * @property {SxProps} [sx]
 * @property {React.ReactNode} children
 */
/**
 * @type {React.FC<LayoutContainerProps>}
 */
export const LayoutContainer: React.FC<LayoutContainerProps>;
export default LayoutContainer;
export type SxProps = import('@mui/system').SxProps;
export type LayoutContainerProps = {
    sx?: SxProps | undefined;
    children: React.ReactNode;
};
import ContainerHeader from "@cubeartisan/client/components/containers/ContainerHeader.js";
import ContainerBody from "@cubeartisan/client/components/containers/ContainerBody.js";
import ContainerFooter from "@cubeartisan/client/components/containers/ContainerFooter.js";
export { ContainerHeader, ContainerBody, ContainerFooter };
//# sourceMappingURL=LayoutContainer.d.ts.map