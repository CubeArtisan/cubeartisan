import { For } from 'solid-js';
import { A } from 'solid-start';

import Hero from '@cubeartisan/cubeartisan/components/generic/Hero/Hero';
import homePageCards from '@cubeartisan/cubeartisan/mock/home-page-cards';
import * as styles from '@cubeartisan/cubeartisan/routes/home.css';
import { atoms } from '@cubeartisan/cubeartisan/styles';

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
      <Hero justify="center" background="gradientCenter">
        <div class={atoms({ textAlign: 'center', height: 40 })}>
          <h1 class={atoms({ fontSize: '2xl', fontWeight: 'bold' })}>CubeArtisan</h1>
          <p class={atoms({ fontSize: 'lg', fontWeight: 'light', color: 'neutralLowContrast' })}>
            Next level cube management
          </p>
        </div>
      </Hero>
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
