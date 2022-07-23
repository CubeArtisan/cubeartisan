export default CardGrid;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type TagWithProps<TagProps> = {
    Tag: React.ComponentType<TagProps>;
    tagProps: Omit<TagProps, 'card'>;
};
export type CardGridPropsNoTag = {
    cardList: Card[];
    linkDetails?: boolean | undefined;
};
declare const CardGrid: import("react").FC<CardGridPropsNoTag & TagWithProps<TagProps>>;
//# sourceMappingURL=CardGrid.d.ts.map