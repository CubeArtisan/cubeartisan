export default withAutocard;
export type AutocardProps = {
    card?: any;
    front?: string;
    back?: string;
    tags?: string[];
};
/**
 * @typedef {{ card?: any, front?: string, back?: string, tags?: string[] }} AutocardProps
 */
/**
 * @template {{ children: import('react').ReactNode, ref: import('react').ForwardedRef<any>}} P
 * @param {import('react').ComponentType<P>} Tag - The tag for the autocard components
 * @returns {import('react').ForwardRefExoticComponent<AutocardProps & P>}
 */
declare function withAutocard<P extends {
    children: import('react').ReactNode;
    ref: import('react').ForwardedRef<any>;
}>(Tag: React.ComponentType<P>): React.ForwardRefExoticComponent<AutocardProps & P>;
import React from "react";
//# sourceMappingURL=WithAutocard.d.ts.map