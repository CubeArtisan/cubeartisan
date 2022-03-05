export default AddToCubeModal;
declare function AddToCubeModal({ card, isOpen, toggle, hideAnalytics, cubeContext }: {
    card: any;
    isOpen: any;
    toggle: any;
    hideAnalytics: any;
    cubeContext: any;
}): JSX.Element;
declare namespace AddToCubeModal {
    namespace propTypes {
        const card: PropTypes.Validator<PropTypes.InferProps<{
            name: PropTypes.Validator<string>;
            image_normal: PropTypes.Validator<string>;
            _id: PropTypes.Validator<string>;
        }>>;
        const isOpen: PropTypes.Validator<boolean>;
        const hideAnalytics: PropTypes.Requireable<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const cubeContext: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const hideAnalytics_1: boolean;
        export { hideAnalytics_1 as hideAnalytics };
        const cubeContext_1: any;
        export { cubeContext_1 as cubeContext };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AddToCubeModal.d.ts.map