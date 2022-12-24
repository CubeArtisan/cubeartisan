import { splitProps } from 'solid-js';

import { useModalContext } from '@cubeartisan/cubeartisan/components/Modal/Modal';
import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

const ModalContent: ArtisanParentComponent<'section'> = (props) => {
  const modalContext = useModalContext();

  const [local, others] = splitProps(props, ['onClick']);
};

export { ModalContent as Content };
