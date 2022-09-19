export default BlogContextMenu;
declare class BlogContextMenu extends Component<any, any, any> {
    constructor(props: any);
    toggleDeleteModal(): void;
    openDeleteModal(): void;
    state: {
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
import { Component } from "react";
import PropTypes from "prop-types";
//# sourceMappingURL=BlogContextMenu.d.ts.map