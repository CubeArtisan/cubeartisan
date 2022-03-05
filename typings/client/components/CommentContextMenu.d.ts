export default CommentContextMenu;
declare function CommentContextMenu({ edit, remove, children }: {
    edit: any;
    remove: any;
    children: any;
}): JSX.Element;
declare namespace CommentContextMenu {
    namespace propTypes {
        const edit: PropTypes.Validator<(...args: any[]) => any>;
        const remove: PropTypes.Validator<(...args: any[]) => any>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CommentContextMenu.d.ts.map