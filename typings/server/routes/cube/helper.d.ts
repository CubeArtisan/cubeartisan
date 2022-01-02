export const DEFAULT_BASICS: string[];
export const CARD_HEIGHT: 680;
export const CARD_WIDTH: 488;
export const CSV_HEADER: "Name,CMC,Type,Color,Set,Collector Number,Rarity,Color Category,Status,Finish,Maybeboard,Image URL,Image Back URL,Tags,Notes,MTGO ID";
export function updateCubeAndBlog(req: any, res: any, cube: any, changelog: any, added: any, missing: any): Promise<any>;
export function bulkUpload(req: any, res: any, list: any, cube: any): Promise<void>;
export function writeCard(res: any, card: any, maybe: any): void;
export function exportToMtgo(res: any, fileName: any, mainCards: any, sideCards: any, cards: any): any;
export function shuffle(a: any): any;
export function addBasics(cardsArray: any, basics: any, collection?: any): void;
export function createPool(): any[][];
export function reverseArray(arr: any, start: any, end: any): void;
export function rotateArrayRight(arr: any, k: any): any;
export function rotateArrayLeft(arr: any, k: any): any;
declare namespace _default {
    export { CARD_HEIGHT };
    export { CARD_WIDTH };
    export { CSV_HEADER };
    export { DEFAULT_BASICS };
    export { addBasics };
    export { bulkUpload };
    export { createPool };
    export { exportToMtgo };
    export { reverseArray };
    export { rotateArrayLeft };
    export { rotateArrayRight };
    export { shuffle };
    export { updateCubeAndBlog };
    export { writeCard };
}
export default _default;
//# sourceMappingURL=helper.d.ts.map