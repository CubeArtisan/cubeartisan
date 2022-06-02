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
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function cardGetLabels(card: Card, sort: (typeof SORTS)[number], showOther?: boolean): any;
/**
 * @param {Card} card
 * @param {typeof SORTS[number]} sort
 */
export function cardCanBeSorted(card: Card, sort: (typeof SORTS)[number]): boolean;
/**
 * @param {Card} card
 * @param {string} label
 * @param {typeof SORTS[number]} sort
 */
export function cardIsLabel(card: Card, label: string, sort: (typeof SORTS)[number]): any;
/**
 * @param {(string|Date)?} label
 */
export function formatLabel(label: (string | Date) | null): string | undefined;
/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function getLabels(cards: Card[], sort: (typeof SORTS)[number], showOther?: boolean): (string | undefined)[];
/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function sortGroupsOrdered(cards: Card[], sort: (typeof SORTS)[number], showOther?: boolean): any[][];
/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function sortIntoGroups(cards: Card[], sort: (typeof SORTS)[number], showOther?: boolean): any;
/**
 * @param {Card[]} cards
 * @param {boolean} showOther
 * @param {typeof SORTS[number]} last
 * @param {(typeof SORTS[number])[]} sorts
 */
export function sortDeep(cards: Card[], showOther: boolean, last: (typeof SORTS)[number], ...sorts: ((typeof SORTS)[number])[]): any[][] | import("@cubeartisan/client/proptypes/CardPropType.js").Card[];
export function countGroup(group: any): any;
/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} primary
 * @param {typeof SORTS[number]} secondary
 * @param {typeof SORTS[number]} tertiary
 * @param {typeof SORTS[number]} quaternary
 * @param {boolean} showOther
 */
export function sortForDownload(cards: Card[], primary?: (typeof SORTS)[number], secondary?: (typeof SORTS)[number], tertiary?: (typeof SORTS)[number], quaternary?: (typeof SORTS)[number], showOther?: boolean): any[];
export const SORTS: string[];
export const ORDERED_SORTS: string[];
export const SortFunctions: {
    Alphabetical: (a: import("@cubeartisan/client/proptypes/CardPropType.js").Card, b: import("@cubeartisan/client/proptypes/CardPropType.js").Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Mana Value': (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    Price: (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    Elo: (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Release Date': (a: Card, b: Card) => 1 | -1 | 0;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Cube Count': (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Pick Count': (a: Card, b: Card) => number;
};
export function SortFunctionsOnDetails(sort: keyof {
    Alphabetical: (a: import("@cubeartisan/client/proptypes/CardPropType.js").Card, b: import("@cubeartisan/client/proptypes/CardPropType.js").Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Mana Value': (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    Price: (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    Elo: (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Release Date': (a: Card, b: Card) => 1 | -1 | 0;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Cube Count': (a: Card, b: Card) => number;
    /**
     * @param {Card} a
     * @param {Card} b
     */
    'Pick Count': (a: Card, b: Card) => number;
}): (a: CardDetails, b: CardDetails) => number;
export type Color = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color;
export type CardDetails = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
//# sourceMappingURL=Sort.d.ts.map