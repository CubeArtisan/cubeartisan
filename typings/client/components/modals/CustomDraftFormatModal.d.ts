export const DEFAULT_PACK: Readonly<{
    slots: string[];
    steps: null;
}>;
export default CustomDraftFormatModal;
declare function CustomDraftFormatModal({ isOpen, toggle, formatIndex, format, setFormat }: {
    isOpen: any;
    toggle: any;
    formatIndex: any;
    format: any;
    setFormat: any;
}): JSX.Element;
declare namespace CustomDraftFormatModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const formatIndex: PropTypes.Validator<number>;
        const format: PropTypes.Validator<object>;
        const setFormat: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CustomDraftFormatModal.d.ts.map