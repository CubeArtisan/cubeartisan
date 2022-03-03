export default UserLayout;
declare function UserLayout({ user, followers, activeLink, children }: {
    user: any;
    followers: any;
    activeLink: any;
    children: any;
}): JSX.Element;
declare namespace UserLayout {
    namespace propTypes {
        const user: any;
        const followers: any;
        const activeLink: any;
        const children: any;
    }
    namespace defaultProps {
        const children_1: boolean;
        export { children_1 as children };
    }
}
//# sourceMappingURL=UserLayout.d.ts.map