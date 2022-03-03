export const ACTION_LABELS: Readonly<{
    pick: string;
    trash: string;
    pickrandom: string;
    trashrandom: string;
}>;
export default PickSelector;
declare function PickSelector({ picksList, curPickNumber, setPickNumberFromEvent }: {
    picksList: any;
    curPickNumber: any;
    setPickNumberFromEvent: any;
}): JSX.Element;
declare namespace PickSelector {
    namespace propTypes {
        const picksList: any;
        const curPickNumber: any;
        const setPickNumberFromEvent: any;
    }
}
//# sourceMappingURL=PickSelector.d.ts.map