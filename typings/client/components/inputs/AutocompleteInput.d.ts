export function AutocompleteTextField({ options, renderOption, InputProps, loading, getOptionLabel, onInputChange, submitButtonProps, onSubmit, inputValueToValue, submitButtonText, noButton, disabled, onRemove, onCreate, ...props }: {
    [x: string]: any;
    options: any;
    renderOption: any;
    InputProps: any;
    loading: any;
    getOptionLabel: any;
    onInputChange: any;
    submitButtonProps: any;
    onSubmit: any;
    inputValueToValue: any;
    submitButtonText: any;
    noButton: any;
    disabled: any;
    onRemove: any;
    onCreate: any;
}): JSX.Element;
export namespace AutocompleteTextField {
    namespace propTypes {
        const options: PropTypes.Validator<any[]>;
        const renderOption: PropTypes.Requireable<(...args: any[]) => any>;
        const InputProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const loading: PropTypes.Requireable<boolean>;
        const getOptionLabel: PropTypes.Requireable<(...args: any[]) => any>;
        const onInputChange: PropTypes.Requireable<(...args: any[]) => any>;
        const inputValueToValue: PropTypes.Requireable<(...args: any[]) => any>;
        const submitButtonText: PropTypes.Requireable<string>;
        const submitButtonProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const noButton: PropTypes.Requireable<boolean>;
        const onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        const disabled: PropTypes.Requireable<boolean>;
        const onRemove: PropTypes.Requireable<(...args: any[]) => any>;
        const onCreate: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export { renderTextOption as renderOption };
        const InputProps_1: {};
        export { InputProps_1 as InputProps };
        const loading_1: boolean;
        export { loading_1 as loading };
        export function getOptionLabel_1(x: any): any;
        export { getOptionLabel_1 as getOptionLabel };
        export function onInputChange_1(): void;
        export { onInputChange_1 as onInputChange };
        export function inputValueToValue_1(x: any): any;
        export { inputValueToValue_1 as inputValueToValue };
        const submitButtonText_1: string;
        export { submitButtonText_1 as submitButtonText };
        const submitButtonProps_1: {};
        export { submitButtonProps_1 as submitButtonProps };
        const noButton_1: boolean;
        export { noButton_1 as noButton };
        export function onSubmit_1(): void;
        export { onSubmit_1 as onSubmit };
        const disabled_1: boolean;
        export { disabled_1 as disabled };
        export function onRemove_1(): void;
        export { onRemove_1 as onRemove };
        export function onCreate_1(): void;
        export { onCreate_1 as onCreate };
    }
}
export function AutocompleteCardField({ fullNames, cubeID, sx, ...props }: {
    [x: string]: any;
    fullNames: any;
    cubeID: any;
    sx: any;
}): JSX.Element;
export namespace AutocompleteCardField {
    export namespace propTypes_1 {
        const cubeID: PropTypes.Requireable<string>;
        const fullNames: PropTypes.Requireable<boolean>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    }
    export { propTypes_1 as propTypes };
    export namespace defaultProps_1 {
        const cubeID_1: null;
        export { cubeID_1 as cubeID };
        const fullNames_1: boolean;
        export { fullNames_1 as fullNames };
        const sx_1: {};
        export { sx_1 as sx };
    }
    export { defaultProps_1 as defaultProps };
}
export function AutocompleteTagField({ updateTags, tags, onSubmit, onRemove, onCreate, ...props }: {
    [x: string]: any;
    updateTags: any;
    tags: any;
    onSubmit: any;
    onRemove: any;
    onCreate: any;
}): JSX.Element;
export namespace AutocompleteTagField {
    export namespace propTypes_2 {
        export const updateTags: PropTypes.Requireable<(...args: any[]) => any>;
        const onSubmit_2: PropTypes.Requireable<(...args: any[]) => any>;
        export { onSubmit_2 as onSubmit };
        const onRemove_2: PropTypes.Requireable<(...args: any[]) => any>;
        export { onRemove_2 as onRemove };
        const onCreate_2: PropTypes.Requireable<(...args: any[]) => any>;
        export { onCreate_2 as onCreate };
        export const tags: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            id: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
    }
    export { propTypes_2 as propTypes };
    export namespace defaultProps_2 {
        export function updateTags_1(): void;
        export { updateTags_1 as updateTags };
        const tags_1: undefined;
        export { tags_1 as tags };
        const onSubmit_3: null;
        export { onSubmit_3 as onSubmit };
        const onRemove_3: null;
        export { onRemove_3 as onRemove };
        const onCreate_3: null;
        export { onCreate_3 as onCreate };
    }
    export { defaultProps_2 as defaultProps };
}
import PropTypes from "prop-types";
/**
 * @param {import('react').HTMLAttributes<HTMLLIElement>} props
 * @param {string} text
 * @param {import('@mui/material').AutocompleteRenderOptionState} _
 * @returns {import('react').ReactNode} option
 */
declare function renderTextOption(props: import('react').HTMLAttributes<HTMLLIElement>, text: string, { selected }: import('@mui/material').AutocompleteRenderOptionState): import('react').ReactNode;
export {};
//# sourceMappingURL=AutocompleteInput.d.ts.map