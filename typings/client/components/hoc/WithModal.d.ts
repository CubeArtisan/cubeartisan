export default withModal;
export type Clickable = {
    onClick: (event: any) => void;
};
export type ModalLike = {
    isOpen: boolean;
    toggle: () => void;
};
/**
 * @typedef {{ onClick: (event: any) => void }} Clickable
 * @typedef {{ isOpen: boolean, toggle: () => void }} ModalLike
 */
/**
 * @template TagProps
 * @template  ModalProps
 * @param {React.ComponentType<TagProps & Clickable>} Tag
 * @param {React.ComponentType<ModalProps & ModalLike>} ModalTag
 */
declare function withModal<TagProps, ModalProps>(Tag: import("react").ComponentType<TagProps & Clickable>, ModalTag: import("react").ComponentType<ModalProps & ModalLike>): import("react").ForwardRefExoticComponent<import("react").PropsWithoutRef<TagProps & {
    modalProps: ModalProps;
}> & import("react").RefAttributes<any>>;
//# sourceMappingURL=WithModal.d.ts.map