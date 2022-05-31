export const ACTION_LABELS: Readonly<{
    pick: "Picked ";
    trash: "Trash ";
    pickrandom: "Randomly Picked ";
    trashrandom: "Randomly Trashed ";
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
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            tags: PropTypes.Requireable<(string | null | undefined)[]>;
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