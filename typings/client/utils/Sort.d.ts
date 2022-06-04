/**
 * @param {Color[]} colors
 */
export function GetColorIdentity(colors: Color[]): string;
/**
 * @param {Color[]} colors
 */
export function getColorCombination(colors: Color[]): any;
/**
 * @param {string} type
 * @param {Color[]} colors
 */
export function GetColorCategory(type: string, colors: Color[]): string;
/**
 * @param {Card} card
 * @param {BucketSort} sort
 * @param {boolean} showOther
 */
export function cardGetLabels(card: Card, sort: BucketSort, showOther?: boolean): any;
/**
 * @param {Card} card
 * @param {BucketSort} sort
 */
export function cardCanBeSorted(card: Card, sort: BucketSort): boolean;
/**
 * @param {Card} card
 * @param {string} label
 * @param {BucketSort} sort
 */
export function cardIsLabel(card: Card, label: string, sort: BucketSort): any;
/**
 * @param {(string|Date)?} label
 */
export function formatLabel(label: (string | Date) | null): string | undefined;
/**
 * @param {Card[]} cards
 * @param {BucketSort} sort
 * @param {boolean} showOther
 */
export function getLabels(cards: Card[], sort: BucketSort, showOther?: boolean): (string | undefined)[];
/**
 * @param {Card[]} cards
 * @param {BucketSort} sort
 * @param {boolean} showOther
 */
export function sortGroupsOrdered(cards: Card[], sort: BucketSort, showOther?: boolean): any[][];
/**
 * @param {Card[]} cards
 * @param {BucketSort} sort
 * @param {boolean} showOther
 */
export function sortIntoGroups(cards: Card[], sort: BucketSort, showOther?: boolean): any;
/**
 * @param {Card[]} cards
 * @param {boolean} showOther
 * @param {BucketSort} last
 * @param {BucketSort[]} sorts
 */
export function sortDeep(cards: Card[], showOther: boolean, last: BucketSort, ...sorts: BucketSort[]): any[][] | import("@cubeartisan/client/proptypes/CardPropType.js").Card[];
export function countGroup(group: any): any;
/**
 * @param {Card[]} cards
 * @param {BucketSort} primary
 * @param {BucketSort} secondary
 * @param {BucketSort} tertiary
 * @param {BucketSort} quaternary
 * @param {boolean} [showOther]
 */
export function sortForDownload(cards: Card[], primary?: BucketSort, secondary?: BucketSort, tertiary?: BucketSort, quaternary?: BucketSort, showOther?: boolean | undefined): any[];
export const SORTS: string[];
export const ORDERED_SORTS: string[];
/**
 * @typedef {typeof SORTS[number]} BucketSort
 * @typedef {typeof ORDERED_SORTS[number]} OrderedSort
 */
/**
 * @type {{[s: OrderedSort]: (a: Card, b: Card) => number}}
 */
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