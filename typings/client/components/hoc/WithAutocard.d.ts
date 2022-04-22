export default withAutocard;
export type AutocardProps = {
    card?: import('@cubeartisan/client/proptypes/CardPropType.js').Card;
    front?: string;
    back?: string;
    tags?: string[];
};
/**
 * @typedef {{ card?: import('@cubeartisan/client/proptypes/CardPropType.js').Card, front?: string, back?: string, tags?: string[] }} AutocardProps
 */
/**
 * @template {object} P
 * @param {import('react').ComponentType<P>} Tag - The tag for the autocard components
 * @returns {import('react').ForwardRefExoticComponent<AutocardProps & P>}
 */
declare function withAutocard<P extends unknown>(Tag: React.ComponentType<P>): React.ForwardRefExoticComponent<AutocardProps & P>;
import React from "react";
//# sourceMappingURL=WithAutocard.d.ts.map