import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

export const TestModal = () => (
  <Modal>
    <Modal.Trigger>Open Modal</Modal.Trigger>
    <Modal.Portal>
      <Modal.Overlay />
      <Modal.Content>
        <VStack<"header"> as="header" recipe={{ align: 'center', justify: 'center' }}>
          <Modal.Title>Test Title</Modal.Title>
          <Modal.Description>this is a test modal to see if things work</Modal.Description>
        </VStack>
        <p>
          Consequat duis sit deserunt nisi irure. Labore exercitation sint sit eu irure officia dolor dolore enim irure
          aliquip officia ea duis fugiat. Amet eiusmod non est veniam proident eiusmod et pariatur anim adipisicing ea
          aute dolore. Ea nostrud esse duis esse exercitation proident anim ipsum laborum. Ad duis veniam enim laboris
          laboris qui incididunt eu ipsum dolor occaecat amet exercitation dolore.
        </p>
        <Modal.CloseButton>Close Modal</Modal.CloseButton>
      </Modal.Content>
    </Modal.Portal>
  </Modal>
);
