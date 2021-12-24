export default withModal;
declare function withModal(Tag: any, ModalTag: any): {
    ({ children, className, modalProps, ...props }: {
        [x: string]: any;
        children: any;
        className: any;
        modalProps: any;
    }): JSX.Element;
    propTypes: {
        children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        modalProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    };
    defaultProps: {
        className: any;
        modalProps: {};
    };
    displayName: string;
};
import PropTypes from "prop-types";
//# sourceMappingURL=WithModal.d.ts.map