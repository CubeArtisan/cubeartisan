export function ColorChecks({ prefix, values, onChange }: {
    prefix: any;
    values: any;
    onChange: any;
}): JSX.Element[];
export function ColorCheckButton({ prefix, size, color, short, value, onChange }: {
    prefix: any;
    size: any;
    color: any;
    short: any;
    value: any;
    onChange: any;
}): JSX.Element;
export namespace ColorCheckButton {
    namespace propTypes {
        const prefix: PropTypes.Validator<string>;
        const size: PropTypes.Requireable<string>;
        const color: PropTypes.Validator<string>;
        const short: PropTypes.Validator<string>;
        const value: PropTypes.Requireable<boolean>;
        const onChange: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const value_1: boolean;
        export { value_1 as value };
        const size_1: any;
        export { size_1 as size };
    }
}
export function ColorChecksControl({ colorless, prefix, size, values, onChange, style, ...props }: {
    [x: string]: any;
    colorless: any;
    prefix: any;
    size: any;
    values: any;
    onChange: any;
    style: any;
}): JSX.Element;
export namespace ColorChecksControl {
    export namespace propTypes_1 {
        export const colorless: PropTypes.Requireable<boolean>;
        const prefix_1: PropTypes.Requireable<string>;
        export { prefix_1 as prefix };
        const size_2: PropTypes.Validator<string>;
        export { size_2 as size };
        export const values: PropTypes.Validator<PropTypes.InferProps<{}>>;
        const onChange_1: PropTypes.Validator<(...args: any[]) => any>;
        export { onChange_1 as onChange };
        export const style: PropTypes.Requireable<PropTypes.InferProps<{
            height: PropTypes.Requireable<string>;
            fontSize: PropTypes.Requireable<string>;
        }>>;
    }
    export { propTypes_1 as propTypes };
    export namespace defaultProps_1 {
        const colorless_1: boolean;
        export { colorless_1 as colorless };
        const prefix_2: string;
        export { prefix_2 as prefix };
        const style_1: {};
        export { style_1 as style };
    }
    export { defaultProps_1 as defaultProps };
}
export function ColorChecksAddon({ addonType, colorless, prefix, size, values, onChange }: {
    addonType: any;
    colorless: any;
    prefix: any;
    size: any;
    values: any;
    onChange: any;
}): JSX.Element;
export namespace ColorChecksAddon {
    export namespace propTypes_2 {
        const colorless_2: PropTypes.Requireable<boolean>;
        export { colorless_2 as colorless };
        const prefix_3: PropTypes.Requireable<string>;
        export { prefix_3 as prefix };
        const size_3: PropTypes.Validator<string>;
        export { size_3 as size };
        const values_1: PropTypes.Validator<PropTypes.InferProps<{}>>;
        export { values_1 as values };
        const onChange_2: PropTypes.Validator<(...args: any[]) => any>;
        export { onChange_2 as onChange };
        export const addonType: PropTypes.Requireable<string>;
    }
    export { propTypes_2 as propTypes };
    export namespace defaultProps_2 {
        const addonType_1: string;
        export { addonType_1 as addonType };
        const colorless_3: boolean;
        export { colorless_3 as colorless };
        const prefix_4: string;
        export { prefix_4 as prefix };
    }
    export { defaultProps_2 as defaultProps };
}
export default ColorCheck;
import PropTypes from "prop-types";
declare function ColorCheck({ prefix, short, value, onChange }: {
    prefix: any;
    short: any;
    value: any;
    onChange: any;
}): JSX.Element;
declare namespace ColorCheck {
    export namespace propTypes_3 {
        const prefix_5: PropTypes.Requireable<string>;
        export { prefix_5 as prefix };
        const short_1: PropTypes.Validator<string>;
        export { short_1 as short };
        const value_2: PropTypes.Requireable<boolean>;
        export { value_2 as value };
        const onChange_3: PropTypes.Validator<(...args: any[]) => any>;
        export { onChange_3 as onChange };
    }
    export { propTypes_3 as propTypes };
    export namespace defaultProps_3 {
        const prefix_6: string;
        export { prefix_6 as prefix };
        const value_3: boolean;
        export { value_3 as value };
    }
    export { defaultProps_3 as defaultProps };
}
//# sourceMappingURL=ColorCheck.d.ts.map