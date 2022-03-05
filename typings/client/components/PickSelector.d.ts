export const ACTION_LABELS: Readonly<{
    pick: string;
    trash: string;
    pickrandom: string;
    trashrandom: string;
}>;
export default PickSelector;
declare function PickSelector({ picksList, curPickNumber, setPickNumberFromEvent }: {
    picksList: any;
    curPickNumber: any;
    setPickNumberFromEvent: any;
}): JSX.Element;
declare namespace PickSelector {
    namespace propTypes {
        const picksList: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<string[]>;
            tags: PropTypes.Requireable<string[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }>[][]>;
        const curPickNumber: PropTypes.Validator<number>;
        const setPickNumberFromEvent: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PickSelector.d.ts.map