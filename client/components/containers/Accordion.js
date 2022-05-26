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
import { AccordionDetails, AccordionSummary, Accordion as MuiAccordion } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Accordion = ({ defaultExpand, children, title }) => (
  <MuiAccordion defaultExpanded={defaultExpand}>
    <AccordionSummary>{title}</AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </MuiAccordion>
);

Accordion.propTypes = {
  defaultExpand: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

Accordion.defaultProps = {
  defaultExpand: false,
};

export default Accordion;
