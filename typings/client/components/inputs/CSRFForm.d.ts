export default CSRFForm;
export type ReactNode = import('react').ReactNode;
export type ComponentType = import('react').ForwardRefExoticComponent<{
    children: ReactNode;
    action: string;
    encType?: string;
    method?: string;
}>;
/**
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('react').ForwardRefExoticComponent<{ children: ReactNode, action: string, encType?: string, method?: string }>} ComponentType
 * @type ComponentType
 */
declare const CSRFForm: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
    action: string;
    encType?: string;
    method?: string;
}>;
//# sourceMappingURL=CSRFForm.d.ts.map