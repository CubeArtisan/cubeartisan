export default UserLayout;
declare function UserLayout({ user, followers, activeLink, children }: {
    user: any;
    followers: any;
    activeLink: any;
    children: any;
}): JSX.Element;
declare namespace UserLayout {
    namespace propTypes {
        const user: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
        }>>;
        const followers: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const activeLink: PropTypes.Validator<string>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const children_1: boolean;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=UserLayout.d.ts.map