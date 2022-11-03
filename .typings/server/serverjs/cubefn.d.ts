export function getCubeId(cube: any): any;
export function buildIdQuery(id: string): {
    _id: string;
    shortID?: never;
} | {
    shortID: string;
    _id?: never;
};
export function generateShortId(): Promise<string>;
export function intToLegality(val: any): string;
export function legalityToInt(legality: any): undefined;
export function cardsAreEquivalent(card: any, details: any): boolean;
export function cardIsLegal(card: any, legality: any): boolean;
export function setCubeType(cube: any, carddb: any): any;
export function abbreviate(name: any): any;
export function buildTagColors(cube: any): any;
export function cubeCardTags(cube: any): any[];
export function maybeCards(cube: any, carddb: any): any;
export function getCardElo(cardname: any, round: any): Promise<any>;
export function CSVtoCards(csvString: any, carddb: any): {
    newCards: {
        name: any;
        cmc: any;
        type_line: any;
        colors: any;
        addedTmsp: Date;
        collector_number: any;
        status: any;
        finish: any;
        maybeboard: any;
        imgUrl: any;
        imgBackUrl: any;
        tags: any;
        notes: any;
        rarity: any;
        colorCategory: any;
    }[];
    newMaybe: {
        name: any;
        cmc: any;
        type_line: any;
        colors: any;
        addedTmsp: Date;
        collector_number: any;
        status: any;
        finish: any;
        maybeboard: any;
        imgUrl: any;
        imgBackUrl: any;
        tags: any;
        notes: any;
        rarity: any;
        colorCategory: any;
    }[];
    missing: any[];
};
export function compareCubes(cardsA: any, cardsB: any): Promise<{
    inBoth: any[];
    onlyA: any;
    onlyB: any;
    aNames: any;
    bNames: any;
    allCards: any[];
}>;
export function getEloAdjustment(winner: any, loser: any, speed: any): number[];
export function newCardAnalytics(cardName: any, elo: any): {
    cardName: any;
    picks: number;
    passes: number;
    elo: any;
    mainboards: number;
    sideboards: number;
};
export function removeDeckCardAnalytics(cube: any, deck: any, carddb: any): Promise<void>;
export function addDeckCardAnalytics(cube: any, deck: any, carddb: any): Promise<void>;
export function saveDraftAnalytics(draft: any, seatNumber: any, carddb: any): Promise<void>;
export function generateSamplepackImageSharp(sources?: any[], options?: {}): Promise<any>;
export function cachePromise(key: any, callback: any): any;
export function generatePack(cubeId: any, carddb: any, seed: any): Promise<{
    seed: any;
    pack: {
        details: any;
        addedTmsp: Date;
        cardID: string;
        cmc: number | null;
        colorCategory: string | null;
        colors: import("../../client/proptypes/CardDetailsPropType.js").Color[] | null;
        finish: import("../../client/proptypes/CardPropType.js").CardFinish;
        imgBackUrl: string | null;
        imgUrl: string | null;
        index?: number | undefined;
        isUnlimited?: boolean | undefined;
        name: string | null;
        notes: string;
        rarity: string | null;
        status: import("../../client/proptypes/CardPropType.js").CardStatus;
        tags: string[];
        type_line: string | null;
    }[];
}>;
//# sourceMappingURL=cubefn.d.ts.map