// for testing components
// import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

const Test = () => (
  <VStack atoms={{ width: 'screenW', height: 'screenH', placeItems: 'center' }}>
    <Modal />
  </VStack>
);
export default Test;

// <VStack atoms={{ width: 'screenW', height: 'screenH', placeItems: 'center' }}>
//   <Modal />
// </VStack>
