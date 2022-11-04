export default DeckDeleteModal;
export type Deck = import('@cubeartisan/client/proptypes/DeckPropType.js').Deck;
export type DeckDeleteModalProps = {
    deckID: string;
    cubeID?: string | null | undefined;
    nextURL?: string | null | undefined;
    isOpen: boolean;
    toggle: () => void;
};
declare const DeckDeleteModal: React.FC<DeckDeleteModalProps>;
//# sourceMappingURL=DeckDeleteModal.d.ts.map