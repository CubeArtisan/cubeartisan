export default NotificationPropType;
export type Notification = {
    text?: string | null | undefined;
    user_from_name?: string | null | undefined;
    url?: string | null | undefined;
    user_from?: string | null | undefined;
    date?: string | null | undefined;
};
declare const NotificationPropType: PropTypes.Requireable<PropTypes.InferProps<{
    text: PropTypes.Requireable<string>;
    user_from_name: PropTypes.Requireable<string>;
    url: PropTypes.Requireable<string>;
    user_from: PropTypes.Requireable<string>;
    date: PropTypes.Requireable<string>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=NotificationPropType.d.ts.map