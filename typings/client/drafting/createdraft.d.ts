export function matchingCards(cards: (Card | CardWithAsfan)[], filter: Filter | null): (import("@cubeartisan/client/proptypes/CardPropType.js").Card | CardWithAsfan)[];
export function parseDraftFormat(format: PackSpec[], splitter?: string | undefined): ExtendedPackSpec[];
export function getDraftFormat(params: DraftParams, cube: Cube): InternalDraftFormat;
export function createDraft(format: InternalDraftFormat, cubeCards: Card[], seats: number, userid: string | null, botsOnly?: boolean | undefined, seed?: string | null | undefined): import("@cubeartisan/client/proptypes/DraftPropType.js").Draft;
export function checkFormat(format: InternalDraftFormat, cards: Card[]): {
    ok: boolean;
    messages: any[];
};
export function weightedAverage(arr: [number, number][]): number;
export function weightedMedian(arr: [number, number][]): number;
export function weightedPercentiles(arr: [number, number][], num: number): number[];
export function weightedStdDev(arr: [number, number][], avg?: number | null | undefined): number;
export function calculateAsfans(cube: Cube, draftFormat: number): any;
export type Filter = import('@cubeartisan/client/filtering/FilterCards.js').Filter;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type DraftFormat = import('@cubeartisan/client/proptypes/CubePropType.js').DraftFormat;
export type PackSpec = import('@cubeartisan/client/proptypes/CubePropType.js').PackSpec;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
export type Step = import('@cubeartisan/client/proptypes/CubePropType.js').Step;
export type Draft = import('@cubeartisan/client/proptypes/DraftPropType.js').Draft;
export type DraftPack = import('@cubeartisan/client/proptypes/DraftPropType.js').DraftPack;
export type CardWithAsfan = Card & {
    asfan: number;
};
export type ExtendedPackSpec = {
    slots: Filter[][];
    steps: Step[] | null;
};
export type InternalDraftProperties = {
    custom: boolean;
    multiples: boolean;
    timeout: number;
    humanSeats: number;
};
export type DraftParams = {
    id: number;
    packs: number;
    timeout: number;
    humanSeats: number;
    cards: number;
};
export type InternalDraftFormat = InternalDraftProperties & ExtendedPackSpec[];
//# sourceMappingURL=createdraft.d.ts.map