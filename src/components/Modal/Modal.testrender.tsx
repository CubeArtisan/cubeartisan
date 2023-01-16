import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import * as styles from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender.css';

export const TestModal = () => (
  <Modal.Root>
    <Modal.Root.Trigger>Open Modal</Modal.Root.Trigger>
    <Modal.Root.Portal>
      <Modal.Root.Overlay />
      <Modal.Root.Content>
        <header class={styles.header}>
          <Modal.Root.Title>Test Title</Modal.Root.Title>
          <Modal.Root.Description>this is a test modal to see if things work</Modal.Root.Description>
        </header>
        <p>
          Consequat duis sit deserunt nisi irure. Labore exercitation sint sit eu irure officia dolor dolore enim irure
          aliquip officia ea duis fugiat. Amet eiusmod non est veniam proident eiusmod et pariatur anim adipisicing ea
          aute dolore. Ea nostrud esse duis esse exercitation proident anim ipsum laborum. Ad duis veniam enim laboris
          laboris qui incididunt eu ipsum dolor occaecat amet exercitation dolore.
        </p>
        <Modal.Root.CloseButton>Close Modal</Modal.Root.CloseButton>
      </Modal.Root.Content>
    </Modal.Root.Portal>
  </Modal.Root>
);
