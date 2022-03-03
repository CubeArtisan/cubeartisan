export default SampleHandModal;
declare class SampleHandModal {
    constructor(props: any);
    state: {
        isOpen: boolean;
        hand: any[];
        pool: any[];
    };
    open(event: any): void;
    close(): void;
    refresh(): void;
    draw(): void;
    render(): JSX.Element;
}
declare namespace SampleHandModal {
    namespace propTypes {
        const deck: any;
    }
}
//# sourceMappingURL=SampleHandModal.d.ts.map