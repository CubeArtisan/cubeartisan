export default UserPropType;
export type Notification = import('@cubeartisan/client/proptypes/NotificationPropType.js').Notification;
export type User = {
    _id: string | null;
    email?: string | null | undefined;
    username?: string | null | undefined;
    about?: string | null | undefined;
    notifications: Notification[];
    image_name?: string | null | undefined;
    image?: string | null | undefined;
    artist?: string | null | undefined;
    users_following: string[];
    roles: string[];
    hide_featured: boolean;
    theme: ('default' | 'dark') | null;
};
/**
 * @typedef {import('@cubeartisan/client/proptypes/NotificationPropType.js').Notification} Notification
 * @typedef User
 * @property {string?} _id
 * @property {string?} [email]
 * @property {string?} [username]
 * @property {string?} [about]
 * @property {Notification[]} notifications
 * @property {string?} [image_name]
 * @property {string?} [image]
 * @property {string?} [artist]
 * @property {string[]} users_following
 * @property {string[]} roles
 * @property {boolean} hide_featured
 * @property {('default' | 'dark')?} theme
 */
declare const UserPropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
    email: PropTypes.Requireable<string>;
    username: PropTypes.Requireable<string>;
    about: PropTypes.Requireable<string>;
    notifications: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
    image_name: PropTypes.Requireable<string>;
    image: PropTypes.Requireable<string>;
    artist: PropTypes.Requireable<string>;
    theme: PropTypes.Requireable<string>;
    users_following: PropTypes.Requireable<string[]>;
    roles: PropTypes.Validator<(string | null | undefined)[]>;
    hide_featured: PropTypes.Requireable<boolean>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=UserPropType.d.ts.map