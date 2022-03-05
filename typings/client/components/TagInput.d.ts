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
        const tags: PropTypes.Validator<PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            id: PropTypes.Requireable<string>;
        }>[]>;
        const addTag: PropTypes.Validator<(...args: any[]) => any>;
        const deleteTag: PropTypes.Validator<(...args: any[]) => any>;
        const reorderTag: PropTypes.Validator<(...args: any[]) => any>;
        const dontAddSuggestions: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const dontAddSuggestions_1: boolean;
        export { dontAddSuggestions_1 as dontAddSuggestions };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=TagInput.d.ts.map