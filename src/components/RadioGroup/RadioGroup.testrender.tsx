import { createSignal, For, JSXElement, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { RadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup';
import * as styles from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup.css';
import { VSeparator } from '@cubeartisan/cubeartisan/components/Separator';
import { HStack } from '@cubeartisan/cubeartisan/components/Stack';

const radioGroupItems: { label: string; id: string; content: JSXElement }[] = [
  {
    label: 'Paste Text',
    id: 'paste',
    content: () => <artisan.textarea id="paste" name="paste" rows="10" />,
  },
  {
    label: 'From URL',
    id: 'url',
    content: () => <artisan.input id="url" name="url" type="url" />,
  },
  {
    label: 'From File',
    id: 'file',
    content: () => <artisan.input id="file" name="file" type="file" />,
  },
];

export const TestRadioGroup = () => {
  const [value, setValue] = createSignal<string>();
  let radioRef;

  return (
    <RadioGroup
      value={value()}
      onValueChange={setValue}
      ref={radioRef}
      atoms={{ display: 'flex', flexDirection: 'column', gap: 'gutter' }}
    >
      <RadioGroup.Label>Test Group</RadioGroup.Label>
      <HStack
        class={styles.radioGroupItemGroup}
        recipe={{
          align: 'center',
          justify: 'spaceEvenly',
        }}
      >
        <For each={radioGroupItems}>
          {(item) => (
            <>
              <RadioGroup.Item value={item.id} class={styles.radioGroupItem}>
                <RadioGroup.ItemInput />
                <RadioGroup.ItemLabel>{item.label}</RadioGroup.ItemLabel>
              </RadioGroup.Item>
              <Show when={value() === item.id}>
                <Portal mount={radioRef}>{item.content}</Portal>
              </Show>
              <Show when={radioGroupItems.indexOf(item) + 1 !== radioGroupItems.length}>
                <VSeparator atoms={{ backgroundColor: 'neutralImportant' }} />
              </Show>
            </>
          )}
        </For>
      </HStack>
    </RadioGroup>
  );
};
