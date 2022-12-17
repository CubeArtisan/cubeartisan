import { For } from 'solid-js';
import { A } from 'solid-start';

import Box from '@cubeartisan/cubeartisan/components/base/Box/Box';
import * as Hero from '@cubeartisan/cubeartisan/components/generic/Hero/';
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
    <main class={styles.app}>
      <Hero.Root layout="center" background="gradientCenter">
        <Hero.ContentBlock textAlign="center">
          <Box as="h1" fontSize="2xl" fontWeight="bold">
            CubeArtisan
          </Box>
          <Box as="p" fontSize="lg" fontWeight="light" color="neutralLowContrast">
            Next level cube management
          </Box>
        </Hero.ContentBlock>
      </Hero.Root>
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
