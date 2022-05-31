export default GroupModalContext;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type GroupModalContextValue = React.Context<import("react").Context<GroupModalContextValue>>;
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef GroupModalContextValue
 * @property {Card[]} groupModalCards
 * @property {() => void} openGroupModal
 * @property {(cards: Card[]) => void} setGroupModalCards
 * @type {React.Context<GroupModalContextValue>}
 */
declare const GroupModalContext: import("react").Context<{
    groupModalCards: never[];
    openGroupModal: () => void;
    setGroupModalCards: () => void;
}>;
//# sourceMappingURL=GroupModalContext.d.ts.map