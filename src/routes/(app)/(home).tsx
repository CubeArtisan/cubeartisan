import { For } from 'solid-js';
import { A } from 'solid-start';

import ContentPage from '@cubeartisan/cubeartisan/components/templates/ContentPage/ContentPage';
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
    <ContentPage>
      {/* <Hero.Root recipe={{ background: 'gradientCenter', layout: 'center' }}>
        <Hero.Content recipe={{ align: 'center' }}>
          <h1 atoms={{ fontSize: '2xl', fontWeight: 'bold' }}>CubeArtisan</h1>
          <p atoms={{ fontSize: 'lg', fontWeight: 'light' }}>Next level cube management</p>
        </Hero.Content>
      </Hero.Root> */}
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
    </ContentPage>
  );
}

//  <main atoms={{ height: 'full' }}>
//       <Hero.Root recipe={{ layout: 'center', background: 'gradientCenter' }}>
//         <Hero.ContentBlock recipe={{ align: 'center' }}>
//           <h1 atoms={{ fontSize: '2xl', fontWeight: 'bold' }}>CubeArtisan</h1>
//           <p atoms={{ fontSize: 'lg', fontWeight: 'light' }} recipe={{ color: 'neutralLowContrast' }}>
//             Next level cube management
//           </p>
//         </Hero.ContentBlock>
//       </Hero.Root>
//       <div atoms={{ marginInline: 'auto', marginBottom: 14, width: 'content-80' }}>
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
//       </div>
//     </main>
