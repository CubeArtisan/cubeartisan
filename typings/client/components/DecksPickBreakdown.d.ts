export function usePickListAndDrafterState({ draft, seatIndex, defaultIndex }: {
    draft: any;
    seatIndex: any;
    defaultIndex: any;
}): {
    picksList: any;
    drafterState: any;
    setPickNumberFromEvent: any;
};
export default DecksPickBreakdown;
declare function DecksPickBreakdown({ draft, ...props }: {
    [x: string]: any;
    draft: any;
}): JSX.Element;
declare namespace DecksPickBreakdown {
    namespace propTypes {
        const draft: any;
        const seatIndex: any;
        const defaultIndex: any;
    }
    namespace defaultProps {
        const defaultIndex_1: number;
        export { defaultIndex_1 as defaultIndex };
    }
}
//# sourceMappingURL=DecksPickBreakdown.d.ts.map