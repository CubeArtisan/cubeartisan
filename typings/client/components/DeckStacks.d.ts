export default DeckStacks;
declare function DeckStacks({ cards, title, subtitle, locationType, canDrop, onMoveCard, onClickCard, cardsInRow, ...props }: {
    [x: string]: any;
    cards: any;
    title: any;
    subtitle: any;
    locationType: any;
    canDrop: any;
    onMoveCard: any;
    onClickCard: any;
    cardsInRow: any;
}): JSX.Element;
declare namespace DeckStacks {
    namespace propTypes {
        const cards: any;
        const title: any;
        const subtitle: any;
        const locationType: any;
        const onMoveCard: any;
        const onClickCard: any;
        const canDrop: any;
        const cardsInRow: any;
    }
    namespace defaultProps {
        const subtitle_1: boolean;
        export { subtitle_1 as subtitle };
        export function onMoveCard_1(): void;
        export { onMoveCard_1 as onMoveCard };
        export function onClickCard_1(): void;
        export { onClickCard_1 as onClickCard };
        export function canDrop_1(): boolean;
        export { canDrop_1 as canDrop };
        const cardsInRow_1: number;
        export { cardsInRow_1 as cardsInRow };
    }
}
//# sourceMappingURL=DeckStacks.d.ts.map