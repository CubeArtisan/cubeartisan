import { Button, Separator } from '@kobalte/core';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Component, For, Show } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/cube/list/ListTable/ListTable.css';
import { testCubeSorted } from '@cubeartisan/cubeartisan/mock/testCubeSorted';

/**
 * # Planning
 * Columns by color
 * Section by type
 * Divide within section by cost
 * Sort within cost by name
 */
export const ListTable = () => {
  const cube = testCubeSorted;

  type Card = {
    name: string;
    color: 'W' | 'U' | 'B' | 'R' | 'G' | 'M' | 'C' | 'L';
    cmc: number;
    type: 'creature' | 'planeswalker' | 'instant' | 'sorcery' | 'enchantment' | 'artifact' | 'land';
  };

  const colorCodeMap = {
    W: 'hsl(50, 100%, 80%, 0.2)',
    U: 'hsl(220, 100%, 65%, 0.2)',
    B: 'hsl(260, 40%, 50%, 0.2)',
    R: 'hsl(0, 100%, 65%, 0.2)',
    G: 'hsl(100, 100%, 65%, 0.2)',
    M: 'hsl(50, 100%, 40%, 0.2)',
    C: 'hsl(0, 0%, 40%, 0.2)',
    L: 'hsl(20, 100%, 40%, 0.2)',
  };

  const colorNameMap = {
    W: 'White',
    U: 'Blue',
    B: 'Black',
    R: 'Red',
    G: 'Green',
    M: 'Multicolor',
    C: 'Colorless',
    L: 'Lands',
  };

  const CardItem: Component<{ card: Card }> = (props) => (
    <Button.Root
      as={'li'}
      class={styles.tableCardItemButton}
      style={assignInlineVars({ [styles.cardBackground]: colorCodeMap[props.card.color] })}
    >
      <span class={styles.tableCardItemText}>{props.card.name}</span>
    </Button.Root>
  );

  const CardCostSection: Component<{ cards: Card[] }> = (props) => (
    <For each={props.cards}>{(card) => <CardItem card={card} />}</For>
  );

  const CardTypeSection: Component<{ cards: Card[][] }> = (props) => {
    const numCardsInSection = () => {
      let total = 0;
      props.cards.forEach((subArray) => {
        total += subArray.length;
      });
      return total;
    };

    return (
      <ul class={styles.tableColumnSection}>
        <h3 class={styles.tableColumnSectionTitle}>{`${props.cards[0][0].type} (${numCardsInSection()})`}</h3>
        <For each={props.cards}>
          {(cardCostSection) => (
            <>
              <CardCostSection cards={cardCostSection} />
              <Show when={numCardsInSection() >= 5 && cardCostSection !== props.cards[props.cards.length - 1]}>
                <Separator.Root class={styles.tableColumnSectionDivider} />
              </Show>
            </>
          )}
        </For>
      </ul>
    );
  };

  const CardColorColumn: Component<{ cards: Card[][][] }> = (props) => (
    <div class={styles.tableColumn}>
      <h2 class={styles.tableColumnTitle}>{colorNameMap[props.cards[0][0][0]?.color]}</h2>
      <div class={styles.tableColumnContent}>
        <For each={props.cards}>{(cardTypeSection) => <CardTypeSection cards={cardTypeSection} />}</For>
      </div>
    </div>
  );

  return (
    <div class={styles.table}>
      <For each={cube.boards[0]?.cards}>{(cardColorSection) => <CardColorColumn cards={cardColorSection} />}</For>
    </div>
  );
};
