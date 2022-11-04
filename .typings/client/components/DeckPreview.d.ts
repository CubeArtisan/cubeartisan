export default DeckPreview;
export type Deck = import('@cubeartisan/client/proptypes/DeckPropType.js').Deck;
export type DeckPreviewProps = {
    deck: Deck;
    nextURL?: string | null | undefined;
};
declare const DeckPreview: React.FC<DeckPreviewProps>;
//# sourceMappingURL=DeckPreview.d.ts.map