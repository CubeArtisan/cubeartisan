export function setCorsUnrestricted(_req: any, res: any, next: any): void;
export function cacheResponse(_req: any, res: any, next: any): void;
export function cacheImmutableResponse(_req: any, res: any, next: any): void;
export function requestLogging(req: any, res: any, next: any): void;
export function csrfProtection(req: any, res: any, next: any): any;
export const ensureAuth: ((req: any, res: any, next: any) => any)[];
export function ensureRole(role: any): (req: any, res: any, next: any) => any;
export function flashValidationErrors(req: any, _res: any, next: any): void;
export function jsonValidationErrors(req: any, res: any, next: any): void;
export function timeoutMiddleware(req: any, res: any, next: any): void;
export function wrapAsyncApi(route: any): (req: any, res: any, next: any) => Promise<any>;
export function handleRouteError(req: any, res: any, err: any, reroute: any): void;
export function wrapAsyncPage(route: any): (req: any, res: any, next: any) => Promise<any>;
//# sourceMappingURL=middleware.d.ts.map