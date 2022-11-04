export function GetColorIdentity(colors: Color[]): string;
export function getColorCombination(colors: Color[]): any;
export function GetColorCategory(type: string, colors: Color[]): string;
export function cardGetLabels(card: Card, sort: BucketSort, showOther?: boolean): any;
export function cardCanBeSorted(card: Card, sort: BucketSort): boolean;
export function cardIsLabel(card: Card, label: string, sort: BucketSort): any;
export function formatLabel(label: (string | Date) | null): string | undefined;
export function getLabels(cards: Card[], sort: BucketSort, showOther?: boolean): (string | undefined)[];
export function sortGroupsOrdered(cards: Card[], sort: BucketSort, showOther?: boolean): [string, Card[]][];
export function sortIntoGroups(cards: Card[], sort: BucketSort, showOther?: boolean): {
    [k: string]: import("@cubeartisan/client/proptypes/CardPropType.js").Card[];
};
export function sortDeep(cards: Card[], showOther: boolean, last: OrderedSort, ...sorts: BucketSort[]): import("@cubeartisan/client/proptypes/CardPropType.js").Card[] | [string, import("@cubeartisan/client/proptypes/CardPropType.js").Card[]][];
export function countGroup(group: any): any;
export function sortForDownload(cards: Card[], primary?: BucketSort, secondary?: BucketSort, tertiary?: BucketSort, quaternary?: BucketSort, showOther?: boolean | undefined): any[];
export namespace COLOR_MAP {
    const W: string;
    const U: string;
    const B: string;
    const R: string;
    const G: string;
}
export const SORTS: string[];
export const ORDERED_SORTS: string[];
export const SortFunctions: {
    [s: string]: (a: Card, b: Card) => number;
};
export function SortFunctionsOnDetails(sort: BucketSort): (a: CardDetails, b: CardDetails) => number;
export type Color = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color;
export type CardDetails = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
export type BucketSort = (typeof SORTS)[number];
export type OrderedSort = (typeof ORDERED_SORTS)[number];
//# sourceMappingURL=Sort.d.ts.map