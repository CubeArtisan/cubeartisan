export function CommentPage({ comment, loginCallback }: {
    comment: any;
    loginCallback: any;
}): JSX.Element;
export namespace CommentPage {
    namespace propTypes {
        const comment: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            timePosted: PropTypes.Validator<string>;
            ownerName: PropTypes.Validator<string>;
            owner: PropTypes.Requireable<string>;
            parent: PropTypes.Validator<string>;
            parentType: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            content: PropTypes.Validator<string>;
            updated: PropTypes.Validator<boolean>;
        }>>>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CommentPage.d.ts.map