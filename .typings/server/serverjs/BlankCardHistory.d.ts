export default getBlankCardHistory;
declare function getBlankCardHistory(id: any): {
    current: {
        rating: null;
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
        synergistic: never[];
        top: never[];
        creatures: never[];
        spells: never[];
        other: never[];
    };
    versions: any;
    cubes: never[];
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
            rating: null;
            elo: null;
            picks: number;
            cubes: number;
            prices: never[];
        };
        date: string;
    }[];
    cardName: any;
    oracleId: any;
    __v: number;
};
//# sourceMappingURL=BlankCardHistory.d.ts.map