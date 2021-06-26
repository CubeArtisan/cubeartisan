import PropTypes from 'prop-types';
import CardPackagePropType from 'proptypes/CardPackagePropType';

import CardPackage from 'components/CardPackage';
import DynamicFlash from 'components/DynamicFlash';
import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

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
