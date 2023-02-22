import { For } from 'solid-js';
import { A } from 'solid-start';

import { TextField } from '@cubeartisan/cubeartisan/components/TextField';
import homePageCards from '@cubeartisan/cubeartisan/mock/home-page-cards';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/home.css';

type CubeCardProps = {
  thumbnail: string;
  caption: string;
  link: string;
};

const CubeCard = (props: CubeCardProps) => (
  <div class={styles.cubeCardContainer}>
    <div class={styles.cubeCardImage} style={{ 'background-image': `url(${props.thumbnail})` }} />
    <A href={props.link} class={styles.cubeCardLink} />
    <h2 class={styles.cubeCardCaption}>{props.caption}</h2>
  </div>
);

export default function Home() {
  return (
    <main class={styles.main}>
      <header class={styles.hero}>
        <h2 class={styles.heroTitle}>Hello jesseb34r!</h2>
        <TextField.Root>
          <TextField.Input placeholder="Search Site" class={styles.heroSearch} />
        </TextField.Root>
      </header>
      <For each={homePageCards} fallback={<div>Loading...</div>}>
        {(cardList) => (
          <>
            <h2 class={styles.cubeCardListBlurb}>{cardList.blurb}</h2>
            <div class={styles.cubeCardList}>
              <For each={cardList.section} fallback={<div>Loading...</div>}>
                {(card) => <CubeCard {...card} />}
              </For>
            </div>
          </>
        )}
      </For>
    </main>
  );
}
