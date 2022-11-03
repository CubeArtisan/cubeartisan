export default withModal;
export type Clickable = {
    onClick: (event: any) => void;
};
export type ModalLike = {
    isOpen: boolean;
    toggle: () => void;
};
declare function withModal<TagProps, ModalProps extends ModalLike>(Tag: import("react").ComponentType<TagProps & Clickable>, ModalTag: import("react").ComponentType<ModalProps & ModalLike>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<TagProps & {
    modalProps: Omit<ModalProps, "toggle" | "isOpen">;
}> & import("react").RefAttributes<any>>;
//# sourceMappingURL=WithModal.d.ts.map