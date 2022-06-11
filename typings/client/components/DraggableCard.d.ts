export default DraggableCard;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type Location = {
    type: string;
    data: number[];
};
export type DraggableCardProps = {
    card: Card;
    location: Location;
    canDrop: (l1: Location, l2: Location) => boolean;
    onMoveCard: Function;
    onClick?: import("react").MouseEventHandler<HTMLImageElement> | null | undefined;
};
declare const DraggableCard: React.FC<DraggableCardProps>;
//# sourceMappingURL=DraggableCard.d.ts.map