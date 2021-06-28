import PropTypes from 'prop-types';
import CardPackagePropType from '@hypercube/client/proptypes/CardPackagePropType';

import CardPackage from '@hypercube/client/components/CardPackage';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const PackagePage = ({ pack, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <CardPackage cardPackage={pack} refresh={() => window.location.reload()} />
  </MainLayout>
);

PackagePage.propTypes = {
  pack: CardPackagePropType.isRequired,
  loginCallback: PropTypes.string,
};

PackagePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(PackagePage);
