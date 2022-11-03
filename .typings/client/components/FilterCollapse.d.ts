export default FilterCollapse;
export type Filter = import('@cubeartisan/client/filtering/FilterCards.js').Filter;
export type FilterCollapseProps = {
    filter?: import("@cubeartisan/client/filtering/FilterCards.js").Filter | undefined;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
    numCards?: number | null | undefined;
    numShown?: number | null | undefined;
    defaultFilterText?: string | null | undefined;
    noCount?: boolean | null | undefined;
    isOpen: boolean;
};
declare const FilterCollapse: React.FC<FilterCollapseProps>;
//# sourceMappingURL=FilterCollapse.d.ts.map