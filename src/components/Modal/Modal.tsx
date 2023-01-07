import { Dialog as BaseDialog } from '@kobalte/core';
import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import { buttonRecipe } from '@cubeartisan/cubeartisan/components/Button';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanComponent, ArtisanParentComponent, OmitProps } from '@cubeartisan/cubeartisan/components/types';
import { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

const ModalTrigger = artisan(BaseDialog.Trigger, buttonRecipe);

const ModalCloseButton = artisan(BaseDialog.CloseButton, buttonRecipe);

const ModalPortal = artisan(BaseDialog.Portal);

const ModalOverlay: ArtisanComponent<'div'> = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const ArtisanOverlay = artisan(BaseDialog.Overlay);

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

const ModalContent: ArtisanParentComponent<'section'> = (props) => {
  const [local, others] = splitProps(props, ['atoms', 'style']);

  const ArtisanContent = artisan(BaseDialog.Content);

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

const ModalTitle: ArtisanParentComponent<'h2'> = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const ArtisanTitle = artisan(BaseDialog.Title);

  const defaultAtoms: Atoms = {
    fontSize: '2xl',
    lineHeight: '2xl',
    fontWeight: 'semibold',
  };

  return <ArtisanTitle atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

const ModalDescription: ArtisanParentComponent<'p'> = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const ArtisanDescription = artisan(BaseDialog.Description);

  const defaultAtoms: Atoms = {
    fontWeight: 'light',
  };

  return <ArtisanDescription atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

const ArtisanDialog = artisan(BaseDialog);

type ModalComposite = {
  Trigger: typeof ModalTrigger;
  CloseButton: typeof ModalCloseButton;
  Portal: typeof ModalPortal;
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
};

const Modal: OmitProps<typeof ArtisanDialog, 'isModal'> & ModalComposite = (props) => <ArtisanDialog {...props} />;

Modal.Trigger = ModalTrigger;
Modal.CloseButton = ModalCloseButton;
Modal.Portal = ModalPortal;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export { Modal };
