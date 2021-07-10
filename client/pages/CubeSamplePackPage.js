/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';

import { Row, Col } from 'reactstrap';

import CardGrid from '@cubeartisan/client/components/CardGrid.js';
import CardImage from '@cubeartisan/client/components/CardImage.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const SamplePackPage = ({ seed, pack, cube, loginCallback }) => {
  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="playtest">
        <DynamicFlash />
        <div className="container" />
        <br />
        <div className="card">
          <div className="card-header">
            <Row>
              <Col md={6}>
                <h5 className="card-title">Sample Pack</h5>
              </Col>
              <Col md={6} className="text-right">
                <a className="btn btn-success mr-2" href={`/cube/${cube._id}/playtest/sample`}>
                  New Pack
                </a>
                <a className="btn btn-success" href={`/cube/${cube._id}/playtest/sample/${seed}/image`}>
                  Get Image
                </a>
              </Col>
            </Row>
          </div>
          <div className="card-body">
            <Row noGutters className="pack-body justify-content-center">
              <Col style={{ maxWidth: '800px' }}>
                <CardGrid
                  cardList={pack}
                  Tag={CardImage}
                  colProps={{ className: 'col-md-2-4 col-lg-2-4 col-xl-2-4', sm: '3', xs: '4' }}
                  cardProps={{ autocard: true }}
                  className="sample"
                />
              </Col>
            </Row>
          </div>
        </div>
      </CubeLayout>
    </MainLayout>
  );
};

SamplePackPage.propTypes = {
  seed: PropTypes.string.isRequired,
  pack: PropTypes.arrayOf(CardPropType).isRequired,
  cube: CubePropType.isRequired,
  loginCallback: PropTypes.string,
};
SamplePackPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(SamplePackPage);
