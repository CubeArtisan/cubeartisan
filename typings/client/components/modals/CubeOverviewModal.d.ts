export default CubeOverviewModal;
declare function CubeOverviewModal({ cube: savedCube, onError, onCubeUpdate, userID, isOpen, toggle }: {
    cube: any;
    onError: any;
    onCubeUpdate: any;
    userID: any;
    isOpen: any;
    toggle: any;
}): JSX.Element;
declare namespace CubeOverviewModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>>;
        const onError: PropTypes.Validator<(...args: any[]) => any>;
        const onCubeUpdate: PropTypes.Validator<(...args: any[]) => any>;
        const userID: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeOverviewModal.d.ts.map