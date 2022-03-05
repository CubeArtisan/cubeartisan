export default Notification;
declare function Notification({ notification }: {
    notification: any;
}): JSX.Element;
declare namespace Notification {
    namespace propTypes {
        const notification: PropTypes.Validator<PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            user_from_name: PropTypes.Requireable<string>;
            url: PropTypes.Requireable<string>;
            user_from: PropTypes.Requireable<string>;
            date: PropTypes.Requireable<string>;
        }>>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Notification.d.ts.map