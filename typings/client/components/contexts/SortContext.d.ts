export function SortContextProvider({ defaultSorts, defaultShowOther, ...props }: {
    [x: string]: any;
    defaultSorts: any;
    defaultShowOther: any;
}): JSX.Element;
export namespace SortContextProvider {
    namespace propTypes {
        const defaultSorts: any;
        const defaultShowOther: any;
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
declare const DEFAULT_SORTS: string[];
declare const SortContext: any;
//# sourceMappingURL=SortContext.d.ts.map