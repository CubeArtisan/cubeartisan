import { Accessor, Component, Setter, Show } from 'solid-js';
import { createRouteAction } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';

import { getIdByCardName } from '@cubeartisan/cubeartisan/backend/carddb';
import * as styles from '@cubeartisan/cubeartisan/components/cube/CubeEditSidebar/CubeEditSidebar.css';
import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';
import { useCubePageContext } from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeId]';
import type { CubeDbCard } from '@cubeartisan/cubeartisan/types/card';
import type { ArrayAddChange } from '@cubeartisan/cubeartisan/types/patch';

export const EditSidebar: Component<{
  setRef: Setter<HTMLInputElement | undefined>;
  ref: Accessor<HTMLInputElement | undefined>;
}> = (props) => {
  const context = useCubePageContext();

  const [addingCard, addCard] = createRouteAction(async (cardName: string) => {
    const response = await fetch(`/api/v1/card/${encodeURIComponent(cardName)}/name`);
    const json = await response.json();
    if (json.success) {
      context.setCurrentPatch((prev) => ({
        ...prev,
        cards: [...(prev.cards ?? []), { action: 'add', index: -1, value: { id: json.cardId } }],
      }));
    }
  });

  const renderCurrentCardPatch = (): string[] => {
    const currentPatch = context.currentPatch();
    if (currentPatch instanceof Array) {
      return [];
    }

    if (currentPatch.cards?.length) {
      return currentPatch.cards
        .filter((card) => card.action === 'add')
        .map((card) => (card as ArrayAddChange<CubeDbCard>).value.id);
    }

    return [];
  };

  return (
    <div class={styles.editSidebar}>
      <h2 class={styles.editSidebarTitle}>Edit</h2>
      <TextField.Root>
        <TextField.Input ref={props.setRef} type="search" placeholder="Add or Remove" />
      </TextField.Root>
      <div>
        <Button.Root onClick={() => addCard(props.ref()!.value)} recipe={{ padding: 'baseText', color: 'success' }}>
          Add
        </Button.Root>
      </div>
      <Show when={addingCard.pending}>...pending</Show>
      <div>{renderCurrentCardPatch()}</div>
      <div>Notes</div>
    </div>
  );
};
