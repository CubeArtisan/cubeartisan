export default withModal;
declare function withModal(Tag: any, ModalTag: any): {
    ({ children, modalProps, ...props }: {
        [x: string]: any;
        children: any;
        modalProps: any;
    }): JSX.Element;
    propTypes: {
        children: any;
        modalProps: any;
    };
    defaultProps: {
        modalProps: {};
    };
    displayName: string;
};
//# sourceMappingURL=WithModal.d.ts.map