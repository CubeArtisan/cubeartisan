export default CardGrid;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type CardGridProps = {
    cardList: Card[];
    Tag: any;
    cardProps: any;
    linkDetails: boolean | null;
};
declare const CardGrid: React.FC<CardGridProps>;
//# sourceMappingURL=CardGrid.d.ts.map