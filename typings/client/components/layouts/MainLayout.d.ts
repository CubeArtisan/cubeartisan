export default MainLayout;
export type ReactNode = import("react").ReactNode;
export type ComponentType = import("react").FunctionComponent<{
    children: ReactNode;
    loginCallback?: string;
}>;
/**
 * @typedef { import("react").ReactNode } ReactNode
 * @typedef { import("react").FunctionComponent<{ children: ReactNode, loginCallback?: string }> } ComponentType
 * @type ComponentType
 */
declare const MainLayout: ComponentType;
//# sourceMappingURL=MainLayout.d.ts.map