export default UserPreview;
declare function UserPreview({ user }: {
    user: any;
}): JSX.Element;
declare namespace UserPreview {
    namespace propTypes {
        const user: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            users_following: PropTypes.Requireable<string[]>;
        }>>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=UserPreview.d.ts.map