export default TextEntry;
declare function TextEntry({ name, value, onChange, maxLength }: {
    name: any;
    value: any;
    onChange: any;
    maxLength: any;
}): JSX.Element;
declare namespace TextEntry {
    namespace propTypes {
        const name: any;
        const value: any;
        const onChange: any;
        const maxLength: any;
    }
    namespace defaultProps {
        const name_1: string;
        export { name_1 as name };
        const maxLength_1: number;
        export { maxLength_1 as maxLength };
    }
}
//# sourceMappingURL=TextEntry.d.ts.map