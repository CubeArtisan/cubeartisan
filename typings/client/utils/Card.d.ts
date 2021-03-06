export function normalizeName(name: string): string;
export function encodeName(name: string): string;
export function decodeName(name: string | null): string;
export function cardsAreEquivalent(a: Card, b: Card): boolean;
export const COLORS: Color[];
export const COLOR_COMBINATIONS: Color[][];
export const COLOR_INCLUSION_MAP: {
    [k: string]: {
        includes: string[];
    };
};
export function cardColorIdentity(card: Card | null): import("@cubeartisan/client/proptypes/CardDetailsPropType.js").Color[];
export function mainboardRate({ mainboards, sideboards }: {
    mainboards: any;
    sideboards: any;
}): number;
export function pickRate({ picks, passes }: {
    picks: any;
    passes: any;
}): number;
export function cardTags(card: Card | null): string[];
export const cardFinish: CardNullPassthrough<CardFinish>;
export const cardStatus: CardNullPassthrough<CardStatus>;
export function cardCmc(card: Card | null): number;
export const cardId: CardNullPassthrough<string>;
export const cardType: CardNullPassthrough<string>;
export const cardRarity: CardNullPassthrough<string>;
export function cardAddedTime(card: Card | null): Date | undefined;
export function cardImageUrl(card: Card | null, showCustomImages?: boolean): string | null | undefined;
export function cardImageBackUrl(card: Card | null, showCustomImages?: boolean): string | null | undefined;
export function cardNotes(card: Card | null): string | undefined;
export const cardColorCategory: CardNullPassthrough<string>;
export const cardPrice: CardNullPassthrough<number>;
export function cardNormalPrice(card: Card | null): number | null;
export function cardFoilPrice(card: Card | null): number | null;
export function cardPriceEur(card: Card | null): number | null;
export function cardTix(card: Card | null): number | null;
export function cardIsFullArt(card: Card | null): boolean;
export const cardCost: CardNullPassthrough<string[]>;
export const cardSet: CardNullPassthrough<string>;
export const cardCollectorNumber: CardNullPassthrough<string>;
export function cardPromo(card: Card | null): boolean;
export function cardDigital(card: Card | null): boolean;
export function cardIsToken(card: Card | null): boolean;
export const cardBorderColor: CardNullPassthrough<string>;
export const cardName: CardNullPassthrough<string>;
export const cardNameLower: CardNullPassthrough<string>;
export const cardFullName: CardNullPassthrough<string>;
export function cardArtist(card: Card | null): string | null | undefined;
export const cardScryfallUri: CardNullPassthrough<string>;
export function cardOracleText(card: Card | null): string | null | undefined;
export const cardOracleId: CardNullPassthrough<string>;
export function cardLegalities(card: Card | null): {};
export function cardLegalIn(card: Card | null): string[];
export function cardColors(card: Card | null): import("@cubeartisan/client/proptypes/CardDetailsPropType.js").Color[] | null | undefined;
export const cardLanguage: CardNullPassthrough<string>;
export function cardMtgoId(card: Card | null): number | null | undefined;
export function cardTcgplayerId(card: Card | null): number | null | undefined;
export function cardLoyalty(card: Card | null): string | null | undefined;
export function cardPower(card: Card | null): string | null | undefined;
export function cardToughness(card: Card | null): string | null | undefined;
export function cardImageSmall(card: Card | null): string | null | undefined;
export function cardImageNormal(card: Card | null): string | null | undefined;
export function cardArtCrop(card: Card | null): string | null | undefined;
export function cardImageFlip(card: Card | null): string | null | undefined;
export function cardTokens(card: Card | null): string[];
export function cardElo(card: Card | null): number;
export function cardPopularity(card: Card | null): number;
export function cardCubeCount(card: Card | null): number;
export function cardPickCount(card: Card | null): number;
export const cardLayout: CardNullPassthrough<string>;
export const cardReleaseDate: CardNullPassthrough<string>;
export function cardDevotion(card: Card | null, color: Color): number;
export const cardIsSpecialZoneType: CardSpecialZone;
export function makeDefaultCardDetails(): CardDetails;
export function detailsToCard(details: CardDetails): Card;
export function makeDefaultCard(): Card;
export function reasonableCard(card: CardDetails): boolean | 0 | null;
export namespace CARD_CATEGORY_DETECTORS {
    export function gold(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function twobrid(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function hybrid(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function phyrexian(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function promo(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function reprint(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function firstprint(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function firtprinting(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function digital(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export { reasonableCard as reasonable };
    export function dfc(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function mdfc(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function meld(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function tdfc(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function transform(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function flip(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function split(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function leveler(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function commander(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function spell(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function permanent(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function historic(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function vanilla(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function modal(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean | undefined;
    export { isCreatureLand as creatureland };
    export { isCreatureLand as manland };
    export function foil(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails, card: import("@cubeartisan/client/proptypes/CardPropType.js").Card): boolean;
    export function nonfoil(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails, card: import("@cubeartisan/client/proptypes/CardPropType.js").Card): boolean;
    export function fullart(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function bikeland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function cycleland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function bicycleland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function bounceland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function karoo(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function canopyland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function canland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function checkland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function dual(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function fastland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function filterland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function fetchland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function gainland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function painland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function scryland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function shadowland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function shockland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function storageland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function triland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function tangoland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function battleland(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
}
export const CARD_CATEGORIES: string[];
export function makeSubtitle(cards: Card[]): string;
declare namespace _default {
    export { cardTags };
    export { cardFinish };
    export { cardStatus };
    export { cardColorIdentity };
    export { cardCmc };
    export { cardId };
    export { cardType };
    export { cardRarity };
    export { cardAddedTime };
    export { cardImageUrl };
    export { cardNotes };
    export { cardColorCategory };
    export { cardCost };
    export { cardIsFullArt };
    export { cardPrice };
    export { cardFoilPrice };
    export { cardNormalPrice };
    export { cardSet };
    export { cardCollectorNumber };
    export { cardPromo };
    export { cardDigital };
    export { cardIsToken };
    export { cardBorderColor };
    export { cardName };
    export { cardNameLower };
    export { cardFullName };
    export { cardArtist };
    export { cardScryfallUri };
    export { cardOracleText };
    export { cardOracleId };
    export { cardLegalities };
    export { cardLegalIn };
    export { cardColors };
    export { cardLanguage };
    export { cardMtgoId };
    export { cardTcgplayerId };
    export { cardLoyalty };
    export { cardPower };
    export { cardToughness };
    export { cardImageSmall };
    export { cardImageNormal };
    export { cardArtCrop };
    export { cardImageFlip };
    export { cardTokens };
    export { cardDevotion };
    export { cardLayout };
    export { cardIsSpecialZoneType };
    export { cardElo };
    export { cardPopularity };
    export { cardCubeCount };
    export { cardPickCount };
    export { COLOR_COMBINATIONS };
    export { normalizeName };
    export { encodeName };
    export { decodeName };
    export { cardsAreEquivalent };
    export { makeSubtitle };
}
export default _default;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type CardFinish = import('@cubeartisan/client/proptypes/CardPropType.js').CardFinish;
export type CardStatus = import('@cubeartisan/client/proptypes/CardPropType.js').CardStatus;
export type CardDetails = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
export type Color = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color;
export type CardNullPassthrough<T> = {
    (card: null | undefined): null;
    (card: Card): T;
};
export type CardSpecialZone = {
    (card: null | undefined): boolean;
    (card: Card): boolean;
};
declare function isCreatureLand(details: CardDetails): false | RegExpMatchArray | null | undefined;
//# sourceMappingURL=Card.d.ts.map