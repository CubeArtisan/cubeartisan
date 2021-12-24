export function calculateBotPick(): {
    cardOracleIds: string[];
    picked: number[];
    seen: number[];
    basics: number[];
    cardsInPack: number[];
    packNum: number;
    numPacks: number;
    pickNum: number;
    numPicks: number;
    seed: number;
    options: number[][];
    chosenOption: number;
    scores: {
        score: number;
        lands: number[];
        oracleResults: {
            title: string;
            tooltip: string;
            weight: number;
            value: number;
            per_card: number[];
        }[];
    }[];
    recognized: number[];
};
export function calculateBotPickFromOptions(drafterState: any): {
    cardOracleIds: string[];
    picked: number[];
    seen: number[];
    basics: number[];
    cardsInPack: number[];
    packNum: number;
    numPacks: number;
    pickNum: number;
    numPicks: number;
    seed: number;
    options: number[][];
    chosenOption: number;
    scores: {
        score: number;
        lands: number[];
        oracleResults: {
            title: string;
            tooltip: string;
            weight: number;
            value: number;
            per_card: number[];
        }[];
    }[];
    recognized: number[];
};
export function initializeDraftbots(): boolean;
export function testRecognized(oracleIds: any): any;
export function terminateDraftbots(): boolean;
export function restartDraftbots(): boolean;
export function startPool(): boolean;
//# sourceMappingURL=mtgdraftbots.d.ts.map