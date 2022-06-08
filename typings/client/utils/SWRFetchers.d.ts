export function axiosFetcher<T>(url: string): Promise<T>;
export const DEFAULT_AXIOS_OPTIONS: Readonly<{
    fetcher: <T>(url: string) => Promise<T>;
}>;
export default axiosFetcher;
//# sourceMappingURL=SWRFetchers.d.ts.map