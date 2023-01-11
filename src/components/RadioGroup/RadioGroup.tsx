import { RadioGroup as BaseRadioGroup } from '@kobalte/core';
import type { ParentComponent } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

const RadioGroupLabel = artisan(BaseRadioGroup.Label);

const RadioGroupDescription = artisan(BaseRadioGroup.Description);

const RadioGroupErrorMessage = artisan(BaseRadioGroup.ErrorMessage);

const RadioGroupItem = artisan(BaseRadioGroup.Item);

const RadioGroupItemInput = artisan(BaseRadioGroup.ItemInput);

const RadioGroupItemControl = artisan(BaseRadioGroup.ItemControl);

const RadioGroupItemIndicator = artisan(BaseRadioGroup.ItemIndicator);

const RadioGroupItemLabel = artisan(BaseRadioGroup.ItemLabel);

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

const RadioGroup: typeof BaseRadioGroup & RadioGroupComposite & ParentComponent<{ atoms: Atoms }> =
  artisan(BaseRadioGroup);

RadioGroup.Label = RadioGroupLabel;
RadioGroup.Description = RadioGroupDescription;
RadioGroup.ErrorMessage = RadioGroupErrorMessage;
RadioGroup.Item = RadioGroupItem;
RadioGroup.ItemInput = RadioGroupItemInput;
RadioGroup.ItemControl = RadioGroupItemControl;
RadioGroup.ItemIndicator = RadioGroupItemLabel;
RadioGroup.ItemLabel = RadioGroupItemLabel;

export { RadioGroup };
