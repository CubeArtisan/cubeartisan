export function PodcastsPage({ loginCallback, podcasts, episodes, count, page }: {
    loginCallback: any;
    podcasts: any;
    episodes: any;
    count: any;
    page: any;
}): JSX.Element;
export namespace PodcastsPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const podcasts: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const episodes: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const count: PropTypes.Validator<number>;
        const page: PropTypes.Validator<number>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=PodcastsPage.d.ts.map