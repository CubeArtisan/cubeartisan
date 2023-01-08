// for testing components
import { Dialog } from '@kobalte/core';

import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { Center } from '@cubeartisan/cubeartisan/components/Center';
import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
import type { OmitProps } from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const TestModalNew = () => (
  <Dialog>
    <Dialog.Trigger
      class={atoms({
        boxShadow: { default: 'borderNeutralInteractive', hover: 'borderNeutralInteractiveHover' },
        backgroundColor: {
          default: 'neutralComponent',
          hover: 'neutralComponentHover',
          active: 'neutralComponentActive',
        },
        paddingBlock: 1,
        paddingInline: 2,
        borderRadius: 'sm',
        userSelect: 'none',
      })}
    >
      Open Modal
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay
        class={atoms({
          backgroundColor: 'shadowDark10',
          width: 'screenW',
          height: 'screenH',
          position: 'fixed',
          top: 0,
          left: 0,
        })}
      />
      <Dialog.Content
        as="section"
        class={atoms({
          position: 'absolute',
          padding: 4,
          width: 'md',
          backgroundColor: 'neutralComponent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        })}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <VStack<'header'> as="header" atoms={{ marginBottom: 2 }}>
          <Dialog.Title
            class={atoms({
              fontSize: 'lg',
              lineHeight: 'lg',
              fontWeight: 'semibold',
            })}
          >
            Title
          </Dialog.Title>
          <Dialog.Description class={atoms({ fontWeight: 'light' })}>
            A test modal to see how things work
          </Dialog.Description>
        </VStack>
        <Dialog.CloseButton
          class={atoms({
            boxShadow: { default: 'borderDangerInteractive', hover: 'borderDangerInteractiveHover' },
            backgroundColor: {
              default: 'dangerComponent',
              hover: 'dangerComponentHover',
              active: 'dangerComponentActive',
            },
            paddingBlock: 1,
            paddingInline: 2,
            borderRadius: 'sm',
            userSelect: 'none',
            alignSelf: 'flexEnd',
          })}
        >
          Close Modal
        </Dialog.CloseButton>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
);

const TestComponentBox: OmitProps<typeof Center, 'atoms'> = (props) => (
  <Center
    atoms={{ minWidth: 'lg', minHeight: 'md', borderRadius: '2xl', backgroundColor: 'neutralSubtleSecondary' }}
    children={props.children}
  />
);

const Test = () => (
  <VStack style={{ 'min-height': 'calc(100vh - 4rem)' }} atoms={{ gap: 10, padding: 16 }}>
    <TestComponentBox children={<TestModalNew />} />
    <TestComponentBox children={<TestModal />} />
    <TestComponentBox children={<TestButton />} />
  </VStack>
);

export default Test;
