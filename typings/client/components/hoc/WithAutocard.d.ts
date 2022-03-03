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
    children: any;
    ref: any;
}>(Tag: any): any;
//# sourceMappingURL=WithAutocard.d.ts.map