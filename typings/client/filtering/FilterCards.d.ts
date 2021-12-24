export function makeFilter(filterText: any): {
    err: any;
    filter: any;
} | {
    err: boolean;
    filter: any;
};
export const operatorsRegex: RegExp;
export function filterUses(filter: any, name: any): boolean;
export function filterUsedFields(filter: any): any;
export function filterToString(filter: any): any;
export function filterCardsDetails(cards: any, filter: any): any;
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
declare const ALL_OPERATORS: string[];
//# sourceMappingURL=FilterCards.d.ts.map