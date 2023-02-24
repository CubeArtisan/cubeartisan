import { TextField as BaseTextField } from '@kobalte/core';
import clsx from 'clsx';
import { ComponentProps, ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/generic/TextField/TextField.css';

export const TextFieldLabel = BaseTextField.Label;

export const TextFieldInput: ParentComponent<ComponentProps<typeof BaseTextField.Input>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseTextField.Input class={clsx(local.class, styles.textfieldInput)} {...others} />;
};

export const TextFieldDescription: ParentComponent<ComponentProps<typeof BaseTextField.Description>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseTextField.Description class={clsx(local.class, styles.textfieldDescription)} {...others} />;
};

export const TextFieldErrorMessage: ParentComponent<ComponentProps<typeof BaseTextField.ErrorMessage>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseTextField.ErrorMessage class={clsx(local.class, styles.textfieldErrorMessage)} {...others} />;
};

export const TextFieldRoot: ParentComponent<ComponentProps<typeof BaseTextField.Root>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseTextField.Root class={clsx(local.class, styles.textfieldRoot)} {...others} />;
};
