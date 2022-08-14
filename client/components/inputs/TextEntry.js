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
import { Tab, Tabs, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import {
  ContainerBody,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';

/** @param {string} name */
const a11yProps = (name) => ({ id: `tab-${name}`, 'aria-controls': `tabpanel-${name}`, label: name });

const TextEntry = ({ name, value, onChange, maxLength }) => {
  const [tab, setTab] = useState(0);

  return (
    <ErrorBoundary>
      <LayoutContainer>
        <ContainerHeader>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} aria-label="markdownentry-tabs">
            <Tab {...a11yProps('Source')} />
            <Tab {...a11yProps('Preview')} />
          </Tabs>
        </ContainerHeader>
        <ContainerBody>
          {tab === 0 && <TextField name="textarea" value={value} onChange={onChange} />}
          {tab === 1 && <Markdown markdown={value} />}
          <input type="hidden" name={name} maxLength={maxLength} value={value} />
        </ContainerBody>
      </LayoutContainer>
    </ErrorBoundary>
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
