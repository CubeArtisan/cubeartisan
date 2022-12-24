// # Planning
// ## Elements:
// - Root
// - Context Provider
// - Portal
// - Overlay
// - Title (for visuals and accessibility) | Header
// - Description (mostly for accessibility I think?)
// - Content | Body
//
// ## Features
// - Focus lock
// - Scroll lock
// - click outside closes without submitting form
// - keyboard navigation that follows aria standards
import { createContext, createUniqueId, Show, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Portal } from 'solid-js/web';

import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

interface ModalProps {
  isOpen: boolean;
  id?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  onOverlayClick?: () => void;
  onEsc?: () => void;
  // initialFocus?: string - TODO
  blockScrollOnMount?: boolean;
  // transition: TODO
  centered?: boolean;
}

interface ModalState extends Required<Pick<ModalProps, 'isOpen' | 'closeOnOverlayClick' | 'closeOnEsc'>> {
  modalID: string;
  titleID: string;
  descriptionID: string;
  contentID: string;
}

interface ModalContextValue {
  state: ModalState;
  onClose: () => void;
  onOverlayClick: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
}

const ModalContext = createContext<ModalContextValue>();

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('[Artisan]: useModalContext must be used within a `<Modal.Root />` component');
  }

  return context;
};

const Modal: ArtisanParentComponent<'div', Record<string, never>, ModalProps> = (props) => {
  const defaultModalID = `artisan-modal-${createUniqueId()}`;

  const [state] = createStore<ModalState>({
    get isOpen() {
      return props.isOpen;
    },
    get modalID() {
      return props.id ?? defaultModalID;
    },
    get titleID() {
      return `${this.modalID}--title`;
    },
    get descriptionID() {
      return `${this.modalID}--description`;
    },
    get contentID() {
      return `${this.modalID}--content`;
    },
    get closeOnOverlayClick() {
      return props.closeOnOverlayClick ?? true;
    },
    get closeOnEsc() {
      return props.closeOnEsc ?? true;
    },
  });

  const onClose = () => props.onClose();

  let mouseDownTarget: EventTarget | null = null;

  const onMouseDown = (event: MouseEvent) => {
    mouseDownTarget = event.target;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation();

      if (state.closeOnEsc) {
        onClose();
      }

      props.onEsc?.();
    }
  };

  const onOverlayClick = (event: MouseEvent) => {
    event.stopPropagation();
    /**
     * Prevent the modal from closing when user
     * start dragging from the content, and release drag outside the content.
     *
     * Because it is technically not a considered "click outside".
     */
    if (mouseDownTarget !== event.target) {
      return;
    }

    if (state.closeOnOverlayClick) {
      onClose();
    }

    props.onOverlayClick?.();
  };

  const context: ModalContextValue = {
    state,
    onClose,
    onMouseDown,
    onKeyDown,
    onOverlayClick,
  };

  return (
    <Show when={props.isOpen}>
      <ModalContext.Provider value={context}>
        <Portal>{props.children}</Portal>
      </ModalContext.Provider>
    </Show>
  );
};

export { Modal as Root, useModalContext };
export type { ModalProps, ModalContextValue };
