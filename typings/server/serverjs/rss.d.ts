export function getFeedData(url: any): Promise<{
    title: string;
    description: string;
    url: string;
    image: any;
}>;
export function getFeedEpisodes(url: any): Promise<{
    title: string;
    description: string;
    source: any;
    guid: string;
    date: string;
    link: string;
}[]>;
declare namespace _default {
    export { getFeedData };
    export { getFeedEpisodes };
}
export default _default;
//# sourceMappingURL=rss.d.ts.map