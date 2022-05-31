export default BasicsModal;
declare function BasicsModal({ isOpen, toggle, addBasics, deck, basics, cards }: {
    isOpen: any;
    toggle: any;
    addBasics: any;
    deck: any;
    basics: any;
    cards: any;
}): JSX.Element;
declare namespace BasicsModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const addBasics: PropTypes.Validator<(...args: any[]) => any>;
        const deck: PropTypes.Validator<(((number | null | undefined)[] | null | undefined)[] | null | undefined)[]>;
        const basics: PropTypes.Validator<(number | null | undefined)[]>;
        const cards: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            tags: PropTypes.Requireable<(string | null | undefined)[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
                image_flip: PropTypes.Requireable<string>;
                image_small: PropTypes.Requireable<string>;
            }>>;
            addedTmsp: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=BasicsModal.d.ts.map