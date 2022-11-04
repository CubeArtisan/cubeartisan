export function CommentReportsPage({ loginCallback, reports, count, page }: {
    loginCallback: any;
    reports: any;
    count: any;
    page: any;
}): JSX.Element;
export namespace CommentReportsPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const reports: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const count: PropTypes.Validator<number>;
        const page: PropTypes.Validator<number>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CommentReportsPage.d.ts.map