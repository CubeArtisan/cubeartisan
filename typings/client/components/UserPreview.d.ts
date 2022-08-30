export default UserPreview;
declare function UserPreview({ user }: {
    user: any;
}): JSX.Element;
declare namespace UserPreview {
    namespace propTypes {
        const user: import("prop-types").Validator<NonNullable<import("prop-types").InferProps<{
            _id: import("prop-types").Validator<string>;
            email: import("prop-types").Requireable<string>;
            username: import("prop-types").Requireable<string>;
            about: import("prop-types").Requireable<string>;
            notifications: import("prop-types").Requireable<(import("prop-types").InferProps<{}> | null | undefined)[]>;
            image_name: import("prop-types").Requireable<string>;
            image: import("prop-types").Requireable<string>;
            artist: import("prop-types").Requireable<string>;
            theme: import("prop-types").Requireable<string>;
            users_following: import("prop-types").Requireable<string[]>;
            roles: import("prop-types").Validator<(string | null | undefined)[]>;
            hide_featured: import("prop-types").Requireable<boolean>;
        }>>>;
    }
}
//# sourceMappingURL=UserPreview.d.ts.map