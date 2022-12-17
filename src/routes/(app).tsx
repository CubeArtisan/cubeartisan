import { Outlet } from 'solid-start';

import SiteFooter from '@cubeartisan/cubeartisan/components/specialized/SiteFooter';
import SiteNavbar from '@cubeartisan/cubeartisan/components/specialized/SiteNavbar';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const foo = () => (
  <>
    <div
      class={atoms({
        minHeight: 'screenH',
      })}
    >
      <SiteNavbar />
      <Outlet />
    </div>
    <SiteFooter />
  </>
);
export default foo;
