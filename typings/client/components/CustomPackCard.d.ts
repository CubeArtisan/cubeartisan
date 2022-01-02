export default CustomPackCard;
declare function CustomPackCard({ packIndex, pack, canRemove, mutations }: {
    packIndex: any;
    pack: any;
    canRemove: any;
    mutations: any;
}): JSX.Element;
declare namespace CustomPackCard {
    namespace propTypes {
        const packIndex: PropTypes.Validator<number>;
        const pack: PropTypes.Validator<PropTypes.InferProps<{
            slots: PropTypes.Validator<string[]>;
            steps: PropTypes.Requireable<PropTypes.InferProps<{
                action: PropTypes.Validator<string>;
                amount: PropTypes.Requireable<number>;
            }>[]>;
        }>>;
        const canRemove: PropTypes.Requireable<boolean>;
        const mutations: PropTypes.Validator<PropTypes.InferProps<{
            removePack: PropTypes.Validator<(...args: any[]) => any>;
            changeSlot: PropTypes.Validator<(...args: any[]) => any>;
            removeSlot: PropTypes.Validator<(...args: any[]) => any>;
            addSlot: PropTypes.Validator<(...args: any[]) => any>;
            duplicatePack: PropTypes.Validator<(...args: any[]) => any>;
            addStep: PropTypes.Validator<(...args: any[]) => any>;
            changeStepAction: PropTypes.Validator<(...args: any[]) => any>;
            changeStepAmount: PropTypes.Validator<(...args: any[]) => any>;
            removeStep: PropTypes.Validator<(...args: any[]) => any>;
        }>>;
    }
    namespace defaultProps {
        const canRemove_1: boolean;
        export { canRemove_1 as canRemove };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CustomPackCard.d.ts.map