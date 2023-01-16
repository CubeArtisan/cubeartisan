import { RadioGroup as BaseRadioGroup } from '@kobalte/core';
import clsx from 'clsx';
import { ComponentProps, ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup.css';

export const RadioGroupLabel = BaseRadioGroup.Label;

export const RadioGroupDescription = BaseRadioGroup.Description;

export const RadioGroupErrorMessage = BaseRadioGroup.ErrorMessage;

export const RadioGroupItemsContainer: ParentComponent<ComponentProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <div class={clsx(styles.radioGroupItemsContainer, local.class)} {...others} />;
};

export const RadioGroupItem: ParentComponent<ComponentProps<typeof BaseRadioGroup.Item>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseRadioGroup.Item class={clsx(styles.radioGroupItem, local.class)} {...others} />;
};

export const RadioGroupItemInput = BaseRadioGroup.ItemInput;

export const RadioGroupItemControl = BaseRadioGroup.ItemControl;

export const RadioGroupItemIndicator = BaseRadioGroup.ItemIndicator;

export const RadioGroupItemLabel = BaseRadioGroup.ItemLabel;

export const RadioGroupRoot: ParentComponent<ComponentProps<typeof BaseRadioGroup.Root>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseRadioGroup.Root class={clsx(styles.radioGroup, local.class)} {...others} />;
};
