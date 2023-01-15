import { Dialog as BaseDialog } from '@kobalte/core';

import * as styles from '@cubeartisan/cubeartisan/components/Modal/Modal.css';

const ModalTrigger = BaseDialog.Trigger;

const ModalCloseButton = BaseDialog.CloseButton;

const ModalPortal = BaseDialog.Portal;

const ModalOverlay: typeof BaseDialog.Overlay = (props) => <BaseDialog.Overlay class={styles.overlay} {...props} />;

const ModalContent: typeof BaseDialog.Content = (props) => <BaseDialog.Content class={styles.content} {...props} />;

const ModalTitle: typeof BaseDialog.Title = (props) => <BaseDialog.Title class={styles.title} {...props} />;

const ModalDescription: typeof BaseDialog.Description = (props) => (
  <BaseDialog.Description class={styles.description} {...props} />
);

type ModalComposite = {
  Trigger: typeof ModalTrigger;
  CloseButton: typeof ModalCloseButton;
  Portal: typeof ModalPortal;
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
};

const Modal: typeof BaseDialog & ModalComposite = (props) => <BaseDialog {...props} />;

Modal.Trigger = ModalTrigger;
Modal.CloseButton = ModalCloseButton;
Modal.Portal = ModalPortal;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export { Modal };
