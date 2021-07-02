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

import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';

import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const ContactPage = ({ title, content, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3 mx-4">
      <CardHeader>
        <h5>{title}</h5>
      </CardHeader>
      <CardBody>
        {content.map((item) =>
          item.table ? (
            <Table bordered responsive className="mt-lg-3">
              {item.table.map((row) => (
                <tr>
                  <th scope="col">{row[0]}</th>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <Row key={item.label} className={item.label.length > 0 ? 'mt-3' : 'my-0'}>
              <Col xs="12" sm="3">
                <strong>{item.label}</strong>
              </Col>
              <Col xs="12" sm="9">
                <p>{item.text}</p>
              </Col>
            </Row>
          ),
        )}
        <span data-ccpa-link="1" />
      </CardBody>
    </Card>
  </MainLayout>
);

ContactPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loginCallback: PropTypes.string,
};

ContactPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ContactPage);
