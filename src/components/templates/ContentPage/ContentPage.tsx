import { ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/templates/ContentPage/ContentPage.css';

const ContentPage: ParentComponent = (props) => {
  const [local, others] = splitProps(props, ['children']);

  return (
    <main class={styles.main} {...others}>
      {local.children}
    </main>
  );
};

export default ContentPage;
