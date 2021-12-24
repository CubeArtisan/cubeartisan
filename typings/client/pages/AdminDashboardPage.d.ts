export function AdminDashboardPage({ loginCallback, commentReportCount, applicationCount, articlesInReview, videosInReview, podcastsInReview, }: {
    loginCallback: any;
    commentReportCount: any;
    applicationCount: any;
    articlesInReview: any;
    videosInReview: any;
    podcastsInReview: any;
}): JSX.Element;
export namespace AdminDashboardPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const commentReportCount: PropTypes.Validator<number>;
        const applicationCount: PropTypes.Validator<number>;
        const articlesInReview: PropTypes.Validator<number>;
        const videosInReview: PropTypes.Validator<number>;
        const podcastsInReview: PropTypes.Validator<number>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=AdminDashboardPage.d.ts.map