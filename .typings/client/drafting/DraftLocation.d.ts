export function moveOrAddCard(cards: any, target: any, source: any): any[];
export function removeCard(cards: any, source: any): any[];
export default DraftLocation;
declare class DraftLocation {
    static pack(data: any): DraftLocation;
    static picks(data: any): DraftLocation;
    static deck(data: any): DraftLocation;
    static sideboard(data: any): DraftLocation;
    constructor(type: any, data: any);
    type: any;
    data: any;
    equals(other: any): boolean;
    toString(): string;
}
declare namespace DraftLocation {
    const PACK: string;
    const PICKS: string;
    const DECK: string;
    const SIDEBOARD: string;
}
//# sourceMappingURL=DraftLocation.d.ts.map