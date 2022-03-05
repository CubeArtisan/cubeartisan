export default BlogContextMenu;
declare class BlogContextMenu extends React.Component<any, any, any> {
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
        const post: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            cube: PropTypes.Validator<string>;
        }>>;
        const value: PropTypes.Validator<string>;
        const onEdit: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import React from "react";
import PropTypes from "prop-types";
//# sourceMappingURL=BlogContextMenu.d.ts.map