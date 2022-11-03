export default Notification;
declare function Notification({ notification }: {
    notification: any;
}): JSX.Element;
declare namespace Notification {
    namespace propTypes {
        const notification: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
            text: import("prop-types").Requireable<string>;
            user_from_name: import("prop-types").Requireable<string>;
            url: import("prop-types").Requireable<string>;
            user_from: import("prop-types").Requireable<string>;
            date: import("prop-types").Requireable<string>;
        }>>>;
    }
}
//# sourceMappingURL=Notification.d.ts.map