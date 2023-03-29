import { RadioGroup as BaseRadioGroup, Separator } from '@kobalte/core';
import clsx from 'clsx';
import { Component, ComponentProps, ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/generic/RadioGroup/RadioGroup.css';

const RadioGroupLabel = BaseRadioGroup.Label;

const RadioGroupDescription = BaseRadioGroup.Description;

const RadioGroupErrorMessage = BaseRadioGroup.ErrorMessage;

const RadioGroupItemsContainer: ParentComponent<ComponentProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <div class={clsx(styles.radioGroupItemsContainer, local.class)} {...others} />;
};

const RadioGroupItem: ParentComponent<
  ComponentProps<typeof BaseRadioGroup.Item> & { recipe?: styles.RadioGroupItemRecipe }
> = (props) => {
  const [local, others] = splitProps(props, ['class', 'recipe']);

  return <BaseRadioGroup.Item class={clsx(styles.radioGroupItem(local.recipe), local.class)} {...others} />;
};

const RadioGroupItemInput = BaseRadioGroup.ItemInput;

const RadioGroupItemControl = BaseRadioGroup.ItemControl;

const RadioGroupItemIndicator = BaseRadioGroup.ItemIndicator;

const RadioGroupItemLabel = BaseRadioGroup.ItemLabel;

const RadioGroupItemSeparator: Component<ComponentProps<typeof Separator.Root>> = (props) => {
  const [local, others] = splitProps(props, ['class', 'orientation']);

  return <Separator.Root orientation="vertical" class={clsx(styles.vSeparator, local.class)} {...others} />;
};

const RadioGroupRoot: ParentComponent<ComponentProps<typeof BaseRadioGroup.Root>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseRadioGroup.Root class={clsx(styles.radioGroup, local.class)} {...others} />;
};

export const RadioGroup = {
  Root: RadioGroupRoot,
  Label: RadioGroupLabel,
  Description: RadioGroupDescription,
  ErrorMessage: RadioGroupErrorMessage,
  ItemsContainer: RadioGroupItemsContainer,
  Item: RadioGroupItem,
  ItemLabel: RadioGroupItemLabel,
  ItemInput: RadioGroupItemInput,
  ItemControl: RadioGroupItemControl,
  ItemIndicator: RadioGroupItemIndicator,
  ItemSeparator: RadioGroupItemSeparator,
};
