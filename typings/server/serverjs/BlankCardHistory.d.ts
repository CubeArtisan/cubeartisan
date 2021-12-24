export default getBlankCardHistory;
declare function getBlankCardHistory(id: any): {
    current: {
        rating: any;
        elo: any;
        picks: number;
        total: number[];
        size180: number[];
        size360: number[];
        size450: number[];
        size540: number[];
        size720: number[];
        pauper: number[];
        legacy: number[];
        modern: number[];
        standard: number[];
        vintage: number[];
        cubes: number;
        prices: any;
    };
    cubedWith: {
        synergistic: any[];
        top: any[];
        creatures: any[];
        spells: any[];
        other: any[];
    };
    versions: any;
    cubes: any[];
    history: {
        data: {
            size180: number[];
            size360: number[];
            size450: number[];
            size540: number[];
            size720: number[];
            pauper: number[];
            legacy: number[];
            modern: number[];
            standard: number[];
            vintage: number[];
            total: number[];
            rating: any;
            elo: any;
            picks: number;
            cubes: number;
            prices: any[];
        };
        date: string;
    }[];
    cardName: any;
    oracleId: any;
    __v: number;
};
//# sourceMappingURL=BlankCardHistory.d.ts.map