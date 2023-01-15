import { RadioGroup as BaseRadioGroup } from '@kobalte/core';
import type { ComponentProps, ParentComponent } from 'solid-js';

const RadioGroupLabel = BaseRadioGroup.Label;

const RadioGroupDescription = BaseRadioGroup.Description;

const RadioGroupErrorMessage = BaseRadioGroup.ErrorMessage;

const RadioGroupItem = BaseRadioGroup.Item;

const RadioGroupItemInput = BaseRadioGroup.ItemInput;

const RadioGroupItemControl = BaseRadioGroup.ItemControl;

const RadioGroupItemIndicator = BaseRadioGroup.ItemIndicator;

const RadioGroupItemLabel = BaseRadioGroup.ItemLabel;

type RadioGroupComposite = {
  Label: typeof RadioGroupLabel;
  Description: typeof RadioGroupDescription;
  ErrorMessage: typeof RadioGroupErrorMessage;
  Item: typeof RadioGroupItem;
  ItemInput: typeof RadioGroupItemInput;
  ItemControl: typeof RadioGroupItemControl;
  ItemIndicator: typeof RadioGroupItemIndicator;
  ItemLabel: typeof RadioGroupItemLabel;
};

const RadioGroup: ParentComponent<ComponentProps<typeof BaseRadioGroup>> & RadioGroupComposite = BaseRadioGroup;

RadioGroup.Label = RadioGroupLabel;
RadioGroup.Description = RadioGroupDescription;
RadioGroup.ErrorMessage = RadioGroupErrorMessage;
RadioGroup.Item = RadioGroupItem;
RadioGroup.ItemInput = RadioGroupItemInput;
RadioGroup.ItemControl = RadioGroupItemControl;
RadioGroup.ItemIndicator = RadioGroupItemIndicator;
RadioGroup.ItemLabel = RadioGroupItemLabel;

export { RadioGroup };
