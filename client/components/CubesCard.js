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
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Link, Paper, Typography } from '@mui/material';

import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import CubePreview from '@cubeartisan/client/components/CubePreview.js';
import { ExpandMore } from '@mui/icons-material';
import CardHeader from '@cubeartisan/client/components/CardHeader.js';

/**
 * @typedef { import('react').FunctionComponent<{ cubes: [any], title: string, lean: Boolean, header?: { sideLink: string, sideText: string, hLevel: number } }>} ComponentType
 * @type ComponentType
 * */
const CubesCard = ({ cubes, title, header, lean, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Heading = `h${header?.hLevel ?? 4}`;
  const toggleAccordion = useCallback((event, isExpanded) => {
    setIsOpen(isExpanded);
  }, []);

  return (
    <Paper elevation={2} {...props}>
      <CardHeader>
        {/* @ts-ignore */}
        <Typography variant={Heading}>{title}</Typography>
        {header && (
          <Link variant="subtitle1" href={header.sideLink}>
            {header.sideText}
          </Link>
        )}
      </CardHeader>
      <Grid container>
        {cubes.slice(0, 2).map((cube) => (
          <Grid item key={cube._id} xs={12} md={6}>
            <CubePreview cube={cube} />
          </Grid>
        ))}
      </Grid>
      <Accordion expanded={isOpen} onChange={toggleAccordion}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">{isOpen ? 'View Fewer...' : 'View More...'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {cubes.slice(2).map((cube) => (
              <Grid item key={cube._id} xs={12} md={6}>
                <CubePreview cube={cube} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

CubesCard.propTypes = {
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.shape({
    sideLink: PropTypes.string.isRequired,
    sideText: PropTypes.string.isRequired,
    hLevel: PropTypes.number.isRequired,
  }),
  lean: PropTypes.bool,
};
CubesCard.defaultProps = {
  header: undefined,
  lean: false,
};

export default CubesCard;
