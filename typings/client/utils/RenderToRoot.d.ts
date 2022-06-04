export default RenderToRoot;
export type User = import('@cubeartisan/client/proptypes/UserPropType.js').User;
export type SiteCustomizations = import('@cubeartisan/client/components/contexts/SiteCustomizationContext.js').SiteCustomizations;
export type DefaultProps = {
    user: User | null;
    siteCustomizations: SiteCustomizations | null;
};
export type ElementProps<Props> = Props & DefaultProps;
declare function RenderToRoot<Props>(Element: import("react").ComponentType<ElementProps<Props>>): () => JSX.Element;
//# sourceMappingURL=RenderToRoot.d.ts.map