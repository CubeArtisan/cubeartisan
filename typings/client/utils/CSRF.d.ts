export function getCsrfToken(): string | null;
export function csrfFetch(resource: any, init?: {
    method: string;
}): Promise<Response>;
export function postJson(resource: any, body: any): Promise<Response>;
export function putJson(resource: any, body: any): Promise<Response>;
//# sourceMappingURL=CSRF.d.ts.map