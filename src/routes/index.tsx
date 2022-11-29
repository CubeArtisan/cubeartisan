import { For } from 'solid-js';
import { A } from 'solid-start';

import homePageCards from '@cubeartisan/cubeartisan/mock/home-page-cards';
import * as styles from '@cubeartisan/cubeartisan/routes/index.css';

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
    <main class={styles.app}>
      <div class={styles.hero}>
        <h1 class={styles.heroTitle}>CubeArtisan</h1>
        <p class={styles.heroSub}>cube design and analysis made easy</p>
      </div>
      <div class={styles.pageContent}>
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
      </div>
    </main>
  );
}
