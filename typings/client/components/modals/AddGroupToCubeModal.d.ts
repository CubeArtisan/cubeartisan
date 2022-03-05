export default AddGroupToCubeModal;
declare function AddGroupToCubeModal({ cards, isOpen, toggle, cubes, packid }: {
    cards: any;
    isOpen: any;
    toggle: any;
    cubes: any;
    packid: any;
}): JSX.Element;
declare namespace AddGroupToCubeModal {
    namespace propTypes {
        const cards: PropTypes.Validator<string[]>;
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const cubes: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>[]>;
        const packid: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const packid_1: any;
        export { packid_1 as packid };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AddGroupToCubeModal.d.ts.map