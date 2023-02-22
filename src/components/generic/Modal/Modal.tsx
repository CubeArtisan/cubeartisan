import { Dialog as BaseDialog } from '@kobalte/core';
import clsx from 'clsx';
import { Component, ComponentProps, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/generic/Modal/Modal.css';

export const ModalTrigger = BaseDialog.Trigger;

export const ModalCloseButton = BaseDialog.CloseButton;

export const ModalPortal = BaseDialog.Portal;

export const ModalOverlay: Component<ComponentProps<typeof BaseDialog.Overlay>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseDialog.Overlay class={clsx(styles.overlay, local.class)} {...others} />;
};

export const ModalContent: Component<ComponentProps<typeof BaseDialog.Content>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseDialog.Content class={clsx(styles.content, local.class)} {...others} />;
};

export const ModalTitle: Component<ComponentProps<typeof BaseDialog.Title>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseDialog.Title class={clsx(styles.title, local.class)} {...others} />;
};

export const ModalDescription: Component<ComponentProps<typeof BaseDialog.Description>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseDialog.Description class={clsx(styles.description, local.class)} {...others} />;
};

export const ModalRoot = BaseDialog.Root;
