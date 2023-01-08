import { Dialog as BaseDialog } from '@kobalte/core';
import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import { buttonRecipe } from '@cubeartisan/cubeartisan/components/Button';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { OmitProps } from '@cubeartisan/cubeartisan/components/types';
import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

const ModalTrigger = artisan(BaseDialog.Trigger, buttonRecipe);

const ModalCloseButton = artisan(BaseDialog.CloseButton, buttonRecipe);

const ModalPortal = BaseDialog.Portal;

const ArtisanOverlay = artisan(BaseDialog.Overlay);

const ModalOverlay: typeof ArtisanOverlay = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const defaultStyles: Atoms = {
    backgroundColor: 'shadowDark10',
    width: 'screenW',
    height: 'screenH',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  return <ArtisanOverlay atoms={merge(defaultStyles, local.atoms)} {...others} />;
};

const ArtisanContent = artisan(BaseDialog.Content);

const ModalContent: typeof ArtisanContent = (props) => {
  const [local, others] = splitProps(props, ['atoms', 'style']);

  const defaultAtoms: Atoms = {
    position: 'fixed',
    paddingInline: 10,
    paddingBlock: 8,
    width: 'md',
    backgroundColor: 'neutralComponent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 'md',
    gap: 4,
  };

  const defaultStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <ArtisanContent atoms={merge(defaultAtoms, local.atoms)} style={merge(defaultStyle, local.style)} {...others} />
  );
};

const ArtisanTitle = artisan(BaseDialog.Title);

const ModalTitle: typeof ArtisanTitle = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const defaultAtoms: Atoms = {
    fontSize: '2xl',
    lineHeight: '2xl',
    fontWeight: 'semibold',
  };

  return <ArtisanTitle atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

const ArtisanDescription = artisan(BaseDialog.Description);

const ModalDescription: typeof ArtisanDescription = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const defaultAtoms: Atoms = {
    fontWeight: 'light',
  };

  return <ArtisanDescription atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

type ModalComposite = {
  Trigger: typeof ModalTrigger;
  CloseButton: typeof ModalCloseButton;
  Portal: typeof ModalPortal;
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
};

const Modal: OmitProps<typeof BaseDialog, 'isModal'> & ModalComposite = (props) => <BaseDialog {...props} />;

Modal.Trigger = ModalTrigger;
Modal.CloseButton = ModalCloseButton;
Modal.Portal = ModalPortal;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export { Modal };
