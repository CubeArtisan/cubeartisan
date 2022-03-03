export default BlogContextMenu;
declare class BlogContextMenu {
    constructor(props: any);
    toggle(): void;
    toggleDeleteModal(): void;
    openDeleteModal(): void;
    state: {
        dropdownOpen: boolean;
        deleteModalOpen: boolean;
    };
    render(): JSX.Element;
}
declare namespace BlogContextMenu {
    namespace propTypes {
        const post: any;
        const value: any;
        const onEdit: any;
    }
}
//# sourceMappingURL=BlogContextMenu.d.ts.map