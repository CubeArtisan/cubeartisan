export function matchingCards(cards: any, filter: any): any;
export function parseDraftFormat(format: any, splitter?: string): any;
export function getDraftFormat(params: any, cube: any): any;
export function createDraft(format: any, cubeCards: any, seats: any, user: any, botsOnly?: boolean, seed?: boolean): {
    seats: never[];
    cards: never[];
    timeout: any;
    seed: boolean;
};
export function checkFormat(format: any, cards: any): {
    ok: boolean;
    messages: any[];
};
export function weightedAverage(arr: any): number;
export function weightedMedian(arr: any): any;
export function weightedPercentiles(arr: any, num: any): any[];
export function weightedStdDev(arr: any, avg?: null): number;
export function calculateAsfans(cube: any, draftFormat: any): {
    [k: string]: any;
};
//# sourceMappingURL=createdraft.d.ts.map