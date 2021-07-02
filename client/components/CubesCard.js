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
import { useState } from 'react';
import PropTypes from 'prop-types';
import CubePropType from '@hypercube/client/proptypes/CubePropType';
import CubePreview from '@hypercube/client/components/CubePreview';
import { Col, Row, Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';

const CubesCard = ({ cubes, title, header, lean, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const Heading = `h${header?.hLevel ?? 4}`;

  return (
    <Card {...props}>
      <CardHeader className="cubes-card-header">
        <Heading>{title} </Heading>
        {header && <a href={header.sideLink}>{header.sideText}</a>}
      </CardHeader>
      <Row noGutters>
        {cubes.slice(0, 2).map((cube) => (
          <Col key={cube._id} lg={6} md={6} sm={12} xs={12}>
            <CubePreview cube={cube} />
          </Col>
        ))}
      </Row>
      <Collapse isOpen={isOpen}>
        <Row noGutters>
          {cubes.slice(2).map((cube) => (
            <Col key={cube._id} lg={6} md={6} sm={12} xs={12}>
              <CubePreview cube={cube} />
            </Col>
          ))}
        </Row>
      </Collapse>
      {(!lean || cubes.length > 2) && (
        <CardBody>
          <Button color="success" block onClick={toggle}>
            {isOpen ? 'View Fewer...' : 'View More...'}
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

CubesCard.propTypes = {
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.shape({
    sideLink: PropTypes.string,
    sideText: PropTypes.string,
    hLevel: PropTypes.number,
  }),
  lean: PropTypes.bool,
};

CubesCard.defaultProps = {
  header: undefined,
  lean: false,
};

export default CubesCard;
