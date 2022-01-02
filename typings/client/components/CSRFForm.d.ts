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
declare const CSRFForm: React.ForwardRefExoticComponent<{
    children: ReactNode;
    action: string;
    encType?: string;
    method?: string;
}>;
import React from "react";
//# sourceMappingURL=CSRFForm.d.ts.map