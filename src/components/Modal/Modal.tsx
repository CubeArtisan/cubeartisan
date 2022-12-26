import { createSignal, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import { Button } from '@cubeartisan/cubeartisan/components/Button';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export {};

export const Modal: ArtisanComponent<'div'> = () => {
  const [isOpen, setIsOpen] = createSignal();
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Show when={isOpen()}>
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
            <artisan.header>
              <artisan.h1>Modal Title</artisan.h1>
              <artisan.p>A test modal that displays placeholders instead of content</artisan.p>
            </artisan.header>
            <artisan.div>
              <Button onClick={close} recipe={{ size: 'sm' }}>
                Close
              </Button>
            </artisan.div>
          </artisan.section>
        </Portal>
      </Show>
    </>
  );
};
