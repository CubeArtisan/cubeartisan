import { createSignal } from 'solid-js';

import { Button } from '@cubeartisan/cubeartisan/components/Button';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

export const TestModal = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <VStack atoms={{ backgroundColor: 'neutralSolid' }}>
      <Button onClick={() => setIsOpen(true)}>Open This Modal</Button>
      <Modal
        isOpen={isOpen()}
        title="Test Modal"
        description="This is a description"
        style={{ width: 'min(90vw, 40ch)' }}
      >
        <p>This is some test content with one paragraph that I'm making up and one that will be lorem text</p>
        <p>
          Elit incididunt ex qui et laborum Lorem ad enim pariatur. Aute mollit exercitation eu eu do nulla incididunt
          incididunt nostrud esse. Excepteur consectetur eiusmod eu et id. Dolor labore Lorem excepteur veniam excepteur
          amet et ut ad deserunt aute aliqua magna. Lorem aliquip Lorem tempor esse amet id reprehenderit ea cupidatat
          eu amet. Qui ad nostrud non adipisicing aliquip labore proident enim deserunt tempor.
        </p>
        <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
      </Modal>
    </VStack>
  );
};
