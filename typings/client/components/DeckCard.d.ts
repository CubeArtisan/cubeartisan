export default DeckCard;
declare function DeckCard({ seat, deck, seatIndex, draft, view }: {
    seat: any;
    deck: any;
    seatIndex: any;
    draft: any;
    view: any;
}): JSX.Element;
declare namespace DeckCard {
    namespace propTypes {
        const seat: any;
        const view: any;
        const draft: any;
        const deck: any;
        const seatIndex: any;
    }
    namespace defaultProps {
        const view_1: string;
        export { view_1 as view };
    }
}
//# sourceMappingURL=DeckCard.d.ts.map