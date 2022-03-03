export default TagInput;
declare function TagInput({ tags, addTag, deleteTag, reorderTag, dontAddSuggestions, ...props }: {
    [x: string]: any;
    tags: any;
    addTag: any;
    deleteTag: any;
    reorderTag: any;
    dontAddSuggestions: any;
}): JSX.Element;
declare namespace TagInput {
    namespace propTypes {
        const tags: any;
        const addTag: any;
        const deleteTag: any;
        const reorderTag: any;
        const dontAddSuggestions: any;
    }
    namespace defaultProps {
        const dontAddSuggestions_1: boolean;
        export { dontAddSuggestions_1 as dontAddSuggestions };
    }
}
//# sourceMappingURL=TagInput.d.ts.map