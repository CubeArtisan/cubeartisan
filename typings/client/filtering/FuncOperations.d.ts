export function defaultOperation(op: any, value: any): (fieldValue: any) => boolean;
export function stringOperation(op: any, value: any): (fieldValue: any) => any;
export function nameStringOperation(op: any, value: any): (fieldValue: any, card: any) => any;
export function stringContainOperation(op: any, value: any): (fieldValue: any) => any;
export function equalityOperation(op: any, value: any): (fieldValue: any) => boolean;
export function setOperation(op: any, value: any): (fieldValue: any) => any;
export function rarityOperation(op: any, value: any): (fieldValue: any) => boolean;
export function convertParsedCost(parsedCost: any): any;
export function manaCostOperation(op: any, value: any): (fieldValue: any) => any;
export function castableCostOperation(op: any, value: any): (fieldValue: any) => boolean;
export function devotionOperation(op: any, symbol: any, value: any): (card: any) => boolean;
export function setCountOperation(op: any, value: any): (fieldValue: any) => boolean;
export function setElementOperation(op: any, value: any): (fieldValue: any) => any;
//# sourceMappingURL=FuncOperations.d.ts.map