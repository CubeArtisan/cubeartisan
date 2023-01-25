import { RouteDataArgs, useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { findCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
import { getClientUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { CubeListView } from '@cubeartisan/cubeartisan/components/templates/cube/list';

export const routeData = ({ params }: RouteDataArgs<{ cubeID: string }>) =>
  createServerData$(
    async ([cubeId], { request }) => {
      const user = await getClientUserFromRequest(request);
      const cube = await findCube(cubeId, user);
      return cube;
    },
    {
      key: () => [params.cubeId],
    },
  );
export type CubeRouteData = typeof routeData;

const CubePage = () => (
  <main>
    <CubeListView />
  </main>
);

export default CubePage;
