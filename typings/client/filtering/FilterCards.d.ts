export function makeFilter(filterText: string | null): {
    err: any;
    filter: Filter | null;
};
export const operatorsRegex: RegExp;
export function filterUses(filter: Filter, name: string): boolean;
export function filterUsedFields(filter: Filter): string[];
export function filterToString(filter: Filter): string;
export function filterCardsDetails(cards: CardDetails[], filter: Filter | null): import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails[];
declare namespace _default {
    export { ALL_OPERATORS as operators };
    export { operatorsRegex };
    export { filterUses };
    export { filterUsedFields };
    export { filterToString };
    export { makeFilter };
    export { filterCardsDetails };
}
export default _default;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type CardDetails = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
export type Filter = {
    (card: Card): boolean;
    stringify: string;
    fieldsUsed: string[];
};
declare const ALL_OPERATORS: string[];
//# sourceMappingURL=FilterCards.d.ts.map