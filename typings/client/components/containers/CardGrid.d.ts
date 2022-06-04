export default CardGrid;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type CardGridProps = {
    cardList: Card[];
    Tag: any;
    cardProps: any;
    linkDetails: boolean | null;
};
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef CardGridProps
 * @property {Card[]} cardList
 * @property {any} Tag
 * @property {any} cardProps
 * @property {boolean?} linkDetails
 */
/**
 * @type {React.FC<CardGridProps>}
 */
declare const CardGrid: React.FC<CardGridProps>;
//# sourceMappingURL=CardGrid.d.ts.map