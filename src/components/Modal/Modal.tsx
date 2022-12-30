import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

const ModalTitle: ArtisanParentComponent<'h1'> = (props) => <artisan.h1 {...props} />;

const ModalDescription: ArtisanParentComponent<'p'> = (props) => <artisan.p {...props} />;

const ModalBody: ArtisanParentComponent<'div'> = (props) => <artisan.div {...props} />;

type ModalProps = {
  isOpen: boolean;
};

const Modal: ArtisanParentComponent<'div', null, ModalProps> = (props) => (
  <Show when={props.isOpen}>
    <Portal>
      <artisan.section
        atoms={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 4,
          backgroundColor: 'neutralComponent',
        }}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        {props.children}
      </artisan.section>
    </Portal>
  </Show>
);

export { Modal as Root, ModalTitle as Title, ModalDescription as Description, ModalBody as Body };
export { ModalProps };
