export function SortContextProvider({ defaultSorts, defaultShowOther, ...props }: {
    [x: string]: any;
    defaultSorts: any;
    defaultShowOther: any;
}): JSX.Element;
export namespace SortContextProvider {
    namespace propTypes {
        const defaultSorts: PropTypes.Requireable<string[]>;
        const defaultShowOther: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        export { DEFAULT_SORTS as defaultSorts };
        const defaultShowOther_1: boolean;
        export { defaultShowOther_1 as defaultShowOther };
    }
}
export default SortContext;
export type SortContextValuesNoSetter = {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
    showOther?: boolean;
};
import PropTypes from "prop-types";
declare const DEFAULT_SORTS: string[];
declare const SortContext: React.Context<{
    changeSort: (newValues: SortContextValuesNoSetter) => SortContextValuesNoSetter;
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
    showOther?: boolean;
}>;
import React from "react";
//# sourceMappingURL=SortContext.d.ts.map