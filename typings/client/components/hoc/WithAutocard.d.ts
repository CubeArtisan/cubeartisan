export default withAutocard;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type AutocardProps = {
    card: Card;
    front?: string | undefined;
    back?: string | undefined;
    tags?: string[] | undefined;
};
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef AutocardProps
 * @property {Card} card
 * @property {string} [front]
 * @property {string} [back]
 * @property {string[]} [tags]
 */
/**
 * @template P
 * @param {React.ComponentType<P>} Tag - The tag for the autocard components
 */
declare function withAutocard<P>(Tag: import("react").ComponentType<P>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<AutocardProps & P> & import("react").RefAttributes<any>>;
//# sourceMappingURL=WithAutocard.d.ts.map