import type { Component } from 'solid-js';

import { CubeListHero } from '@cubeartisan/cubeartisan/components/templates/CubePage/CubeListHero';

export const CubeListPage: Component<{ cubeName: string }> = (props) => (
  <main>
    <CubeListHero cubeName={props.cubeName} />
    {/* list */}
    {/* analytics */}
  </main>
);
