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
 * @param {React.ComponentType<unknown>} Tag - The tag for the autocard components
 * @returns {React.ForwardRefExoticComponent<AutocardProps>}
 */
declare function withAutocard(Tag: React.ComponentType<unknown>): React.ForwardRefExoticComponent<AutocardProps>;
//# sourceMappingURL=WithAutocard.d.ts.map