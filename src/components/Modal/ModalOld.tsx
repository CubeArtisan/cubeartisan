import { merge } from 'lodash';
import { ComponentProps, createUniqueId, mergeProps, Show, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

type ModalProps = {
  isOpen: boolean;
  showOverlay?: boolean;
  onOverlayClick: () => void;
  title?: string;
  description?: string;
};

const Modal: ArtisanParentComponent<'section', ComponentProps<typeof VStack>['recipe'], ModalProps> = (props) => {
  const propsWithDefault = mergeProps({ showOverlay: true }, props);
  const [local, others] = splitProps(propsWithDefault, [
    'children',
    'isOpen',
    'showOverlay',
    'onOverlayClick',
    'title',
    'description',
    'style',
    'atoms',
  ]);

  const rootId = `artisan-modal-${createUniqueId()}`;
  const overlayId = `${rootId}--overlay`;
  const bodyId = `${rootId}--body`;
  const titleId = `${rootId}--title`;
  const descriptionId = `${rootId}--description`;

  return (
    <Show when={local.isOpen}>
      <Portal>
        <VStack>
          <artisan.div
            id={overlayId}
            onClick={() => local.onOverlayClick}
            atoms={{
              width: 'screenW',
              height: 'screenH',
              position: 'fixed',
              top: 0,
              left: 0,
              ...(local.showOverlay ? { backgroundColor: 'shadowDark10' } : {}),
            }}
          />
          <VStack<'section'>
            as="section"
            id={bodyId}
            atoms={merge(
              {
                position: 'absolute',
                padding: 4,
                backgroundColor: 'neutralComponent',
              },
              local.atoms,
            )}
            style={merge({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, local.style)}
            {...others}
          >
            <VStack<'header'> as="header">
              <Show when={local.title}>
                <artisan.h2 id={titleId}>{local.title}</artisan.h2>
              </Show>
              <Show when={local.description}>
                <artisan.p id={descriptionId}>{local.description}</artisan.p>
              </Show>
            </VStack>
            <VStack children={local.children} />
          </VStack>
        </VStack>
      </Portal>
    </Show>
  );
};

export { Modal };
export type { ModalProps };
