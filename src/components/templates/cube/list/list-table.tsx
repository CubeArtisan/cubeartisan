import {
  amberDarkA,
  blueDarkA,
  goldDarkA,
  grayDarkA,
  greenDarkA,
  purpleDarkA,
  redDarkA,
  yellowDarkA,
} from '@radix-ui/colors/src';
import { Component, For } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/templates/cube/list/list-table.css';

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
        <TableColumn title="White" content={mockCards} backgroundColor={goldDarkA.goldA7} />
        <TableColumn title="Blue" content={mockCards} backgroundColor={blueDarkA.blueA5} />
        <TableColumn title="Black" content={mockCards} backgroundColor={purpleDarkA.purpleA3} />
        <TableColumn title="Red" content={mockCards} backgroundColor={redDarkA.redA5} />
        <TableColumn title="Green" content={mockCards} backgroundColor={greenDarkA.greenA5} />
        <TableColumn title="Multicolor" content={mockCards} backgroundColor={yellowDarkA.yellowA7} />
        <TableColumn title="Colorless" content={mockCards} backgroundColor={grayDarkA.grayA4} />
        <TableColumn title="Lands" content={mockCards} backgroundColor={amberDarkA.amberA4} />
      </div>
    </div>
  );
};
