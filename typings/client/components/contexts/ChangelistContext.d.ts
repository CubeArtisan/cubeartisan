export function ChangelistContextProvider({ cubeID, setOpenCollapse, initialChanges, noSave, ...props }: {
    [x: string]: any;
    cubeID: any;
    setOpenCollapse: any;
    initialChanges: any;
    noSave: any;
}): JSX.Element;
export namespace ChangelistContextProvider {
    namespace propTypes {
        const cubeID: any;
        const setOpenCollapse: any;
        const initialChanges: any;
        const noSave: any;
    }
    namespace defaultProps {
        const initialChanges_1: any[];
        export { initialChanges_1 as initialChanges };
        const noSave_1: boolean;
        export { noSave_1 as noSave };
    }
}
export default ChangelistContext;
declare const ChangelistContext: any;
//# sourceMappingURL=ChangelistContext.d.ts.map