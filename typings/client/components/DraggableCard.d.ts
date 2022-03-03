export default DraggableCard;
declare function DraggableCard({ card, location, canDrop, onMoveCard, className, onClick, ...props }: {
    [x: string]: any;
    card: any;
    location: any;
    canDrop: any;
    onMoveCard: any;
    className: any;
    onClick: any;
}): JSX.Element;
declare namespace DraggableCard {
    namespace propTypes {
        const card: any;
        const location: any;
        const canDrop: any;
        const onMoveCard: any;
        const className: any;
        const onClick: any;
    }
    namespace defaultProps {
        const className_1: any;
        export { className_1 as className };
        const onClick_1: any;
        export { onClick_1 as onClick };
    }
}
//# sourceMappingURL=DraggableCard.d.ts.map