export function GetColorIdentity(colors: any): any;
export function getColorCombination(colors: any): any;
export function GetColorCategory(type: any, colors: any): any;
export function cardGetLabels(card: any, sort: any, showOther: any): any;
export function cardCanBeSorted(card: any, sort: any): boolean;
export function cardIsLabel(card: any, label: any, sort: any): any;
export function formatLabel(label: any): any;
export function getLabels(cube: any, sort: any, showOther: any): any;
export function sortGroupsOrdered(cards: any, sort: any, showOther: any): any;
export function sortIntoGroups(cards: any, sort: any, showOther: any): {
    [k: string]: any;
};
export function sortDeep(cards: any, showOther: any, last: any, ...sorts: any[]): any;
export function countGroup(group: any): any;
export function sortForDownload(cards: any, primary?: string, secondary?: string, tertiary?: string, quaternary?: string, showOther?: boolean): any[];
export const SORTS: string[];
export const ORDERED_SORTS: string[];
export const SortFunctions: {
    Alphabetical: (a: any, b: any) => any;
    'Mana Value': (a: any, b: any) => number;
    Price: (a: any, b: any) => number;
    Elo: (a: any, b: any) => number;
    'Release Date': (a: any, b: any) => 1 | 0 | -1;
    'Cube Count': (a: any, b: any) => number;
    'Pick Count': (a: any, b: any) => number;
};
export function SortFunctionsOnDetails(sort: any): (a: any, b: any) => any;
//# sourceMappingURL=Sort.d.ts.map