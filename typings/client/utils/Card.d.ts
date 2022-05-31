/**
 * @param {string} name
 */
export function normalizeName(name: string): string;
/**
 * @param {string} name
 */
export function encodeName(name: string): string;
/**
 * @param {string?} name
 */
export function decodeName(name: string | null): string;
/**
 * @param {Card} a
 * @param {Card} b
 */
export function cardsAreEquivalent(a: Card, b: Card): boolean;
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} CardDetails
 */
export const COLOR_COMBINATIONS: string[][];
export const COLOR_INCLUSION_MAP: {
    [k: string]: {
        [k: string]: any;
    };
};
export function mainboardRate({ mainboards, sideboards }: {
    mainboards: any;
    sideboards: any;
}): number;
export function pickRate({ picks, passes }: {
    picks: any;
    passes: any;
}): number;
export function cardTags(card: Card): string[];
export function cardFinish(card: Card): any;
export function cardStatus(card: Card): any;
export function cardColorIdentity(card: Card): any;
export function cardCmc(card: Card): any;
export function cardId(card: Card): string;
export function cardType(card: Card): any;
export function cardRarity(card: Card): any;
export function cardAddedTime(card: Card): string | null | undefined;
export function cardImageUrl(card: Card, showCustomImages?: boolean): string;
export function cardImageBackUrl(card: Card, showCustomImages?: boolean): string | undefined;
export function cardNotes(card: Card): any;
export function cardColorCategory(card: Card): any;
export function cardPrice(card: Card): any;
export function cardNormalPrice(card: Card): any;
export function cardFoilPrice(card: Card): any;
export function cardPriceEur(card: Card): any;
export function cardTix(card: Card): any;
export function cardIsFullArt(card: Card): any;
export function cardCost(card: Card): any;
export function cardSet(card: Card): any;
export function cardCollectorNumber(card: Card): any;
export function cardPromo(card: Card): any;
export function cardDigital(card: Card): any;
export function cardIsToken(card: Card): any;
export function cardBorderColor(card: Card): any;
export function cardName(card: Card): any;
export function cardNameLower(card: Card): any;
export function cardFullName(card: Card): any;
export function cardArtist(card: Card): any;
export function cardScryfallUri(card: Card): any;
export function cardOracleText(card: Card): any;
export function cardOracleId(card: Card): any;
export function cardLegalities(card: Card): any;
export function cardLegalIn(card: Card): string[];
export function cardColors(card: Card): any;
export function cardLanguage(card: Card): any;
export function cardMtgoId(card: Card): any;
export function cardTcgplayerId(card: Card): any;
export function cardLoyalty(card: Card): any;
export function cardPower(card: Card): any;
export function cardToughness(card: Card): any;
export function cardImageSmall(card: Card): string | undefined;
export function cardImageNormal(card: Card): string;
export function cardArtCrop(card: Card): any;
export function cardImageFlip(card: Card): string | undefined;
export function cardTokens(card: Card): any;
export function cardElo(card: Card): any;
export function cardPopularity(card: Card): string;
export function cardCubeCount(card: Card): any;
export function cardPickCount(card: Card): any;
export function cardLayout(card: Card): any;
export function cardReleaseDate(card: Card): any;
export function cardDevotion(card: Card, color: any): any;
export function cardIsSpecialZoneType(card: Card): boolean;
export function reasonableCard(card: CardDetails): any;
export namespace CARD_CATEGORY_DETECTORS {
    export function gold(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function twobrid(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function hybrid(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function phyrexian(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function promo(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function reprint(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function firstprint(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function firtprinting(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function digital(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export { reasonableCard as reasonable };
    export function dfc(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function mdfc(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function meld(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function tdfc(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function transform(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function flip(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function split(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function leveler(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function commander(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function spell(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function permanent(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function historic(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export function vanilla(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): boolean;
    export function modal(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
    export { isCreatureLand as creatureland };
    export { isCreatureLand as manland };
    export function foil(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails, card: import("@cubeartisan/client/proptypes/CardPropType.js").Card): any;
    export function nonfoil(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails, card: import("@cubeartisan/client/proptypes/CardPropType.js").Card): any;
    export function fullart(details: import("@cubeartisan/client/proptypes/CardDetailsPropType.js").CardDetails): any;
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
export type CardDetails = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
/**
 * @param {CardDetails} details
 */
declare function isCreatureLand(details: CardDetails): any;
//# sourceMappingURL=Card.d.ts.map