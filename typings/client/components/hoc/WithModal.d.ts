export default withModal;
declare function withModal(Tag: any, ModalTag: any): {
    ({ children, modalProps, ...props }: {
        [x: string]: any;
        children: any;
        modalProps: any;
    }): JSX.Element;
    propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        modalProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    };
    defaultProps: {
        modalProps: {};
    };
    displayName: string;
};
import PropTypes from "prop-types";
//# sourceMappingURL=WithModal.d.ts.map