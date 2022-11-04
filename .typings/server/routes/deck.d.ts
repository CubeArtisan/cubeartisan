export function exportDeckToXmage(req: any, res: any): Promise<any>;
export function exportDeckToForge(req: any, res: any): Promise<any>;
export function exportDeckToPlaintext(req: any, res: any): Promise<any>;
export function exportDeckToMtgo(req: any, res: any): Promise<any>;
export function exportDeckToArena(req: any, res: any): Promise<any>;
export function exportDeckToCockatrice(req: any, res: any): Promise<any>;
export const deleteDeck: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any) => Promise<any>))[];
export function viewDeckbuilder(req: any, res: any): Promise<any>;
export function rebuildDeckHandler(req: any, res: any): Promise<any>;
export const rebuildDeck: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any) => Promise<any>))[];
export const updateDeck: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any) => Promise<any>))[];
export function redraftDeck(req: any, res: any): Promise<any>;
export function viewDeck(req: any, res: any): Promise<any>;
//# sourceMappingURL=deck.d.ts.map