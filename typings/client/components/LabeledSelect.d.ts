export default LabeledSelect;
declare function LabeledSelect({ label, baseId, values, value, setValue, labelSx, selectSx }: {
    label: any;
    baseId: any;
    values: any;
    value: any;
    setValue: any;
    labelSx: any;
    selectSx: any;
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
    }
    namespace defaultProps {
        const value_1: any;
        export { value_1 as value };
        const labelSx_1: {};
        export { labelSx_1 as labelSx };
        export namespace selectSx_1 {
            const marginY: number;
        }
        export { selectSx_1 as selectSx };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=LabeledSelect.d.ts.map