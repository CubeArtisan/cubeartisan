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
        const cubes: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>[]>;
        const query: PropTypes.Requireable<string>;
        const count: PropTypes.Requireable<number>;
        const perPage: PropTypes.Requireable<number>;
        const page: PropTypes.Requireable<number>;
        const order: PropTypes.Requireable<string>;
        const loginCallback: PropTypes.Requireable<string>;
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
import PropTypes from "prop-types";
//# sourceMappingURL=SearchPage.d.ts.map