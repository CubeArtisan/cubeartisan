import { Component, For, Show } from 'solid-js';

import { RadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup';

type ComposedRadioGroupProps = {
  label?: string;
  description?: string;
  items: { id: string; label: string }[];
};

export const ComposedRadioGroup: Component<ComposedRadioGroupProps> = (props) => (
  <RadioGroup.Root>
    <Show when={props.label}>
      <RadioGroup.Label>{props.label}</RadioGroup.Label>
    </Show>
    <RadioGroup.ItemsContainer>
      <For each={props.items}>
        {(item, index) => (
          <>
            <RadioGroup.Item value={item.id}>
              <RadioGroup.ItemInput />
              <RadioGroup.ItemLabel>{item.label}</RadioGroup.ItemLabel>
            </RadioGroup.Item>
            <Show when={index() + 1 !== props.items.length}>
              <RadioGroup.ItemSeparator />
            </Show>
          </>
        )}
      </For>
    </RadioGroup.ItemsContainer>
    <Show when={props.description}>
      <RadioGroup.Description>{props.description}</RadioGroup.Description>
    </Show>
  </RadioGroup.Root>
);
