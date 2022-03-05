export function AdminCommentsPage({ loginCallback, comments, count, page }: {
    loginCallback: any;
    comments: any;
    count: any;
    page: any;
}): JSX.Element;
export namespace AdminCommentsPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const comments: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            timePosted: PropTypes.Validator<string>;
            ownerName: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            parent: PropTypes.Validator<string>;
            parentType: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            content: PropTypes.Validator<string>;
            updated: PropTypes.Validator<boolean>;
        }>[]>;
        const count: PropTypes.Validator<number>;
        const page: PropTypes.Validator<number>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=AdminCommentsPage.d.ts.map