export const DEFAULT_SITE_CUSTOMIZATIONS: SiteCustomizations;
export default SiteCustomizationContext;
export type SiteCustomizations = {
    discordUrl: string;
    siteName: string;
    siteRoot: string;
    sourceRepo: string;
    supportEmail: string;
    mtgmlServer: string;
};
declare const SiteCustomizationContext: import("react").Context<SiteCustomizations>;
//# sourceMappingURL=SiteCustomizationContext.d.ts.map