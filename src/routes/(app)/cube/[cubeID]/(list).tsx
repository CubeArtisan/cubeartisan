import { CubeListView } from '@cubeartisan/cubeartisan/components/templates/cube/list';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeID]/(list).css';

const mockCube = {
  name: 'Test Cube',
  owner_name: 'jesseb34r',
};

const CubePage = () => (
  <main class={styles.container}>
    <CubeListView cube={mockCube} />
  </main>
);

export default CubePage;
