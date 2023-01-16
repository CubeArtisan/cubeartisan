import { Separator } from '@kobalte/core';
import { For, Show } from 'solid-js';

import { RadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup';
import * as styles from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup.css';

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
  <RadioGroup.Root class={styles.radioGroup}>
    <RadioGroup.Label>Test Group</RadioGroup.Label>
    <div class={styles.radioGroupItemsContainer}>
      <For each={radioGroupItems}>
        {(item, index) => (
          <>
            <RadioGroup.Item value={item.id} class={styles.radioGroupItem}>
              <RadioGroup.ItemInput />
              <RadioGroup.ItemLabel>{item.label}</RadioGroup.ItemLabel>
            </RadioGroup.Item>
            <Show when={index() + 1 !== radioGroupItems.length}>
              <Separator class={styles.vSeparator} />
            </Show>
          </>
        )}
      </For>
    </div>
  </RadioGroup.Root>
);
