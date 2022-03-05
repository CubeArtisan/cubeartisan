export default UserPropType;
declare const UserPropType: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<string>;
    email: PropTypes.Requireable<string>;
    username: PropTypes.Requireable<string>;
    about: PropTypes.Requireable<string>;
    notifications: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
    image_name: PropTypes.Requireable<string>;
    image: PropTypes.Requireable<string>;
    artist: PropTypes.Requireable<string>;
    theme: PropTypes.Requireable<string>;
    users_following: PropTypes.Requireable<string[]>;
    roles: PropTypes.Validator<string[]>;
    hide_featured: PropTypes.Requireable<boolean>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=UserPropType.d.ts.map