import { For } from 'solid-js';
import { A } from 'solid-start';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as Hero from '@cubeartisan/cubeartisan/components/generic/Hero/Hero';
import homePageCards from '@cubeartisan/cubeartisan/mock/home-page-cards';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/home.css';

type CubeCardProps = {
  thumbnail: string;
  caption: string;
  link: string;
};

const CubeCard = (props: CubeCardProps) => (
  <artisan.div
    atoms={{ overflow: 'hidden', borderRadius: 'sm', boxShadow: { hover: '2xl' } }}
    class={styles.cubeCardContainer}
  >
    <artisan.div class={styles.cubeCardImage} style={{ 'background-image': `url(${props.thumbnail})` }} />
    <A href={props.link} class={styles.cubeCardLink} />
    <artisan.h2 class={styles.cubeCardCaption}>{props.caption}</artisan.h2>
  </artisan.div>
);

export default function Home() {
  return (
    <artisan.main atoms={{ height: 'full' }}>
      <Hero.Root recipe={{ background: 'gradientCenter', layout: 'center' }}>
        <Hero.ContentBlock recipe={{ align: 'center' }}>
          <artisan.h1 atoms={{ fontSize: '2xl', fontWeight: 'bold' }}>CubeArtisan</artisan.h1>
          <artisan.p atoms={{ fontSize: 'lg', fontWeight: 'light' }}>Next level cube management</artisan.p>
        </Hero.ContentBlock>
      </Hero.Root>
      <artisan.div atoms={{ marginInline: 'auto', marginBottom: 14, width: 'content-80' }}>
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
      </artisan.div>
    </artisan.main>
  );
}

//  <artisan.main atoms={{ height: 'full' }}>
//       <Hero.Root recipe={{ layout: 'center', background: 'gradientCenter' }}>
//         <Hero.ContentBlock recipe={{ align: 'center' }}>
//           <artisan.h1 atoms={{ fontSize: '2xl', fontWeight: 'bold' }}>CubeArtisan</artisan.h1>
//           <artisan.p atoms={{ fontSize: 'lg', fontWeight: 'light' }} recipe={{ color: 'neutralLowContrast' }}>
//             Next level cube management
//           </artisan.p>
//         </Hero.ContentBlock>
//       </Hero.Root>
//       <artisan.div atoms={{ marginInline: 'auto', marginBottom: 14, width: 'content-80' }}>
//         <For each={homePageCards} fallback={<div>Loading...</div>}>
//           {(cardList) => (
//             <>
//               <h2 class={styles.cubeCardListBlurb}>{cardList.blurb}</h2>
//               <div class={styles.cubeCardList}>
//                 <For each={cardList.section} fallback={<div>Loading...</div>}>
//                   {(card) => <CubeCard {...card} />}
//                 </For>
//               </div>
//             </>
//           )}
//         </For>
//       </artisan.div>
//     </artisan.main>
