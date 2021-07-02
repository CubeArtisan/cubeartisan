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

import { Card, CardHeader, Input, Nav, TabPane, TabContent, CardBody } from 'reactstrap';

import Tab from '@cubeartisan/client/components/Tab';
import Markdown from '@cubeartisan/client/components/Markdown';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary';

const TextEntry = ({ name, value, onChange, maxLength }) => {
  const [tab, setTab] = useState('0');

  return (
    <Card>
      <ErrorBoundary>
        <CardHeader className="p-0">
          <Nav className="mt-2" tabs justified>
            <Tab tab={tab} setTab={setTab} index="0">
              Source
            </Tab>
            <Tab tab={tab} setTab={setTab} index="1">
              Preview
            </Tab>
          </Nav>
        </CardHeader>
        <TabContent activeTab={tab}>
          <TabPane tabId="0">
            <Input
              type="textarea"
              name="textarea"
              maxLength={maxLength}
              className="w-100 markdown-input"
              value={value}
              onChange={onChange}
            />
          </TabPane>
          <TabPane tabId="1">
            <CardBody>
              <Markdown markdown={value} />
            </CardBody>
          </TabPane>
        </TabContent>
      </ErrorBoundary>
      <Input type="hidden" name={name} maxLength={maxLength} value={value} />
    </Card>
  );
};

TextEntry.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};

TextEntry.defaultProps = {
  name: 'hiddentextarea',
  maxLength: 1000,
};

export default TextEntry;
