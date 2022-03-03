export function SearchPage({ cubes, query, count, perPage, page, order, loginCallback }: {
    cubes: any;
    query: any;
    count: any;
    perPage: any;
    page: any;
    order: any;
    loginCallback: any;
}): JSX.Element;
export namespace SearchPage {
    namespace propTypes {
        const cubes: any;
        const query: any;
        const count: any;
        const perPage: any;
        const page: any;
        const order: any;
        const loginCallback: any;
    }
    namespace defaultProps {
        const query_1: string;
        export { query_1 as query };
        const count_1: number;
        export { count_1 as count };
        const perPage_1: number;
        export { perPage_1 as perPage };
        const page_1: number;
        export { page_1 as page };
        const order_1: string;
        export { order_1 as order };
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
//# sourceMappingURL=SearchPage.d.ts.map