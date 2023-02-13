// import { RouteDataArgs } from 'solid-start';
// import { createServerData$ } from 'solid-start/server';

// import { findCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
// import { getClientUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { CubeListHero } from '@cubeartisan/cubeartisan/components/templates/cube/list/list-hero';
import { CubeListTable } from '@cubeartisan/cubeartisan/components/templates/cube/list/list-table';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeId]/(list).css';

// export const routeData = ({ params }: RouteDataArgs<{ cubeId: string }>) =>
//   createServerData$(
//     async ([cubeId], { request }) => {
//       const user = await getClientUserFromRequest(request);
//       const cube = await findCube(cubeId, user);
//       return cube;
//     },
//     { key: () => [params.cubeId] },
//   );
// export type CubeRouteData = typeof routeData;

const CubePage = () => (
  <main class={styles.main}>
    <CubeListHero />
    <CubeListTable />
  </main>
);

export default CubePage;
