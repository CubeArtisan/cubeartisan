import { Component, For } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/layouts/cube/list/ListTable/ListTable.css';

const TableColumn: Component<{ title: string; content: string[]; backgroundColor: string }> = (props) => (
  <section class={styles.tableColumn}>
    <h2 class={styles.tableColumnTitle}>{props.title}</h2>
    <ul class={styles.tableColumnContent} style={{ 'background-color': props.backgroundColor }}>
      <For each={props.content}>
        {(item) => (
          <li>
            <p class={styles.tableColumnItem}>{item}</p>
          </li>
        )}
      </For>
    </ul>
  </section>
);

export const CubeListTable = () => {
  const mockCards = [
    'lightning bolt',
    'mother of runes',
    'shock',
    'stoneforge mystic',
    'kaldra compleat',
    "umezawa's jitte",
    'lightning bolt',
    'mother of runes',
    'shock',
    'stoneforge mystic',
    'kaldra compleat',
    "umezawa's jitte",
    'lightning bolt',
    'mother of runes',
    'shock',
    'stoneforge mystic',
    'kaldra compleat',
    "umezawa's jitte",
    'lightning bolt',
    'mother of runes',
    'shock',
  ];

  return (
    <div class={styles.tableContainer}>
      <div class={styles.table}>
        <TableColumn title="White" content={mockCards} backgroundColor="hsl(50, 100%, 80%, 0.2)" />
        <TableColumn title="Blue" content={mockCards} backgroundColor="hsl(220, 100%, 65%, 0.2)" />
        <TableColumn title="Black" content={mockCards} backgroundColor="hsl(260, 40%, 50%, 0.2)" />
        <TableColumn title="Red" content={mockCards} backgroundColor="hsl(0, 100%, 65%, 0.2)" />
        <TableColumn title="Green" content={mockCards} backgroundColor="hsl(100, 100%, 65%, 0.2)" />
        <TableColumn title="Multicolor" content={mockCards} backgroundColor="hsl(50, 100%, 40%, 0.2)" />
        <TableColumn title="Colorless" content={mockCards} backgroundColor="hsl(0, 0%, 40%, 0.2)" />
        <TableColumn title="Lands" content={mockCards} backgroundColor="hsl(20, 100%, 40%, 0.2)" />
      </div>
    </div>
  );
};
