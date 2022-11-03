export function defaultStepsForLength(length: any): any[];
export const validActions: string[];
export function getAllDrafterStates({ draft, seatNumber, pickNumber, stepNumber }: {
    draft: any;
    seatNumber: any;
    pickNumber?: number | undefined;
    stepNumber?: null | undefined;
}): {
    step: {
        action: any;
        amount: number;
    };
    cards: any;
    picked: never[];
    trashed: never[];
    drafted: any;
    sideboard: any;
    seatNum: number;
    seen: never[];
    cardsInPack: never[];
    basics: any;
    packNum: number;
    pickNum: number;
    numPacks: any;
    packSize: number;
    pickedNum: number;
    trashedNum: number;
    stepNumber: number;
    pickNumber: number;
    seed: number;
    timeout: any;
}[];
export function getDrafterState(args: any): {
    step: {
        action: any;
        amount: number;
    };
    cards: any;
    picked: never[];
    trashed: never[];
    drafted: any;
    sideboard: any;
    seatNum: number;
    seen: never[];
    cardsInPack: never[];
    basics: any;
    packNum: number;
    pickNum: number;
    numPacks: any;
    packSize: number;
    pickedNum: number;
    trashedNum: number;
    stepNumber: number;
    pickNumber: number;
    seed: number;
    timeout: any;
};
export function getDefaultPosition(card: any, picks: any): any[];
export function convertDrafterState(drafterState: any): {
    basics: any;
    picked: any;
    seen: any;
    cardsInPack: any;
    packNum: any;
    numPacks: any;
    pickNum: any;
    numPicks: any;
};
export function getDraftbotScores(convertedDrafterState: any, mtgmlServer: string, includeOracles?: boolean): Promise<any>;
export function getWorstOption(scores: any): number;
export function getBestOption(scores: any): number;
export function allBotsDraft(draft: any, mtgmlServer: any): Promise<any>;
//# sourceMappingURL=draftutil.d.ts.map