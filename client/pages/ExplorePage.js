import PropTypes from 'prop-types';
import CubePropType from '@hypercube/client/proptypes/CubePropType';

import { Col, Row } from 'reactstrap';
import CubesCard from '@hypercube/client/components/CubesCard';
import CubeSearchNavBar from '@hypercube/client/components/CubeSearchNavBar';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const ExplorePage = ({ recents, featured, drafted, recentlyDrafted, loginCallback }) => {
  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeSearchNavBar />
      <DynamicFlash />
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <CubesCard title="Featured Cubes" className="mt-4" cubes={featured} />
          <CubesCard title="Recently Updated Cubes" className="mt-4" cubes={recents} />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <CubesCard title="Most Drafted Cubes" className="mt-4" cubes={drafted} />
          <CubesCard title="Recently Drafted Cubes" className="mt-4" cubes={recentlyDrafted} />
        </Col>
      </Row>
    </MainLayout>
  );
};

const cubesListProp = PropTypes.arrayOf(CubePropType);

ExplorePage.propTypes = {
  recents: cubesListProp.isRequired,
  featured: cubesListProp.isRequired,
  drafted: cubesListProp.isRequired,
  recentlyDrafted: cubesListProp.isRequired,
  loginCallback: PropTypes.string,
};

ExplorePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ExplorePage);
