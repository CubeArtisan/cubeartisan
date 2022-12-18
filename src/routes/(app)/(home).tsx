import { For } from 'solid-js';
import { A } from 'solid-start';

import Box from '@cubeartisan/cubeartisan/components/base/Box/Box';
import Heading from '@cubeartisan/cubeartisan/components/generic/Heading';
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
    <Box as="main" height="full">
      <Hero.Root recipe={{ layout: 'center', background: 'gradientCenter' }}>
        <Hero.ContentBlock recipe={{ align: 'center' }}>
          <Heading level={1} fontSize="2xl" fontWeight="bold">
            CubeArtisan
          </Heading>
          <Box as="p" fontSize="lg" fontWeight="light" color="neutralLowContrast">
            Next level cube management
          </Box>
        </Hero.ContentBlock>
      </Hero.Root>
      <Box marginInline="auto" marginBottom={16} width="content-80">
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
      </Box>
    </Box>
  );
}
