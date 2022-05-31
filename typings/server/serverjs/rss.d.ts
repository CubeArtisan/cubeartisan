export function getFeedData(url: any): Promise<{
    title: string | undefined;
    description: string | undefined;
    url: string | undefined;
    image: any;
}>;
export function getFeedEpisodes(url: any): Promise<{
    title: string | undefined;
    description: string | undefined;
    source: any;
    guid: string | undefined;
    date: string | undefined;
    link: string | undefined;
}[]>;
declare namespace _default {
    export { getFeedData };
    export { getFeedEpisodes };
}
export default _default;
//# sourceMappingURL=rss.d.ts.map