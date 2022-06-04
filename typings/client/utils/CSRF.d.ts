export function getCsrfToken(): string | null;
export function csrfFetch(resource: string, init?: {
    method: string;
}): Promise<Response>;
export function postJson<T>(resource: string, body: T): Promise<Response>;
export function putJson<T>(resource: string, body: T): Promise<Response>;
//# sourceMappingURL=CSRF.d.ts.map