import { For, Show } from 'solid-js';

import { RadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup';

const radioGroupItems: { label: string; id: string }[] = [
  {
    label: 'Paste Text',
    id: 'paste',
  },
  {
    label: 'From URL',
    id: 'url',
  },
  {
    label: 'From File',
    id: 'file',
  },
];

export const TestRadioGroup = () => (
  <RadioGroup.Root>
    <RadioGroup.Label>Test Group</RadioGroup.Label>
    <RadioGroup.ItemsContainer>
      <For each={radioGroupItems}>
        {(item, index) => (
          <>
            <RadioGroup.Item value={item.id}>
              <RadioGroup.ItemInput />
              <RadioGroup.ItemLabel>{item.label}</RadioGroup.ItemLabel>
            </RadioGroup.Item>
            <Show when={index() + 1 !== radioGroupItems.length}>
              <RadioGroup.ItemSeparator />
            </Show>
          </>
        )}
      </For>
    </RadioGroup.ItemsContainer>
  </RadioGroup.Root>
);
