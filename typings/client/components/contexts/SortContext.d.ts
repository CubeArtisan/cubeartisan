export const SortContextProvider: React.FC<SortContextProviderProps>;
export default SortContext;
export type SortValues = {
    primary?: string | undefined;
    secondary?: string | undefined;
    tertiary?: string | undefined;
    quaternary?: string | undefined;
    showOther?: boolean | undefined;
};
export type SortContextValues = Required<SortValues> & {
    changeSort: (newSort: SortValues) => void;
};
export type SortContextProviderProps = {
    defaultSorts?: [string, string, string, string] | null | undefined;
    defaultShowOther?: boolean | null | undefined;
    children: React.ReactNode;
};
declare const SortContext: import("react").Context<SortContextValues>;
//# sourceMappingURL=SortContext.d.ts.map