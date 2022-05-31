export default CustomizeBasicsModal;
declare function CustomizeBasicsModal({ isOpen, toggle, cube, updateBasics, onError }: {
    isOpen: any;
    toggle: any;
    cube: any;
    updateBasics: any;
    onError: any;
}): JSX.Element;
declare namespace CustomizeBasicsModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
        }>>;
        const updateBasics: PropTypes.Validator<(...args: any[]) => any>;
        const onError: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CustomizeBasicsModal.d.ts.map