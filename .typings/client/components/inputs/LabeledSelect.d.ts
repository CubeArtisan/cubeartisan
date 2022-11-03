export default LabeledSelect;
declare function LabeledSelect({ label, baseId, values, value, setValue, labelSx, selectSx, keys, name }: {
    label: any;
    baseId: any;
    values: any;
    value: any;
    setValue: any;
    labelSx: any;
    selectSx: any;
    keys: any;
    name: any;
}): JSX.Element;
declare namespace LabeledSelect {
    namespace propTypes {
        const label: PropTypes.Validator<string>;
        const baseId: PropTypes.Validator<string>;
        const values: PropTypes.Validator<string[]>;
        const value: PropTypes.Requireable<string>;
        const setValue: PropTypes.Validator<(...args: any[]) => any>;
        const labelSx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const selectSx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const keys: PropTypes.Requireable<string[]>;
        const name: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const value_1: null;
        export { value_1 as value };
        const labelSx_1: {};
        export { labelSx_1 as labelSx };
        export namespace selectSx_1 {
            const marginY: number;
        }
        export { selectSx_1 as selectSx };
        const keys_1: null;
        export { keys_1 as keys };
        const name_1: null;
        export { name_1 as name };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=LabeledSelect.d.ts.map