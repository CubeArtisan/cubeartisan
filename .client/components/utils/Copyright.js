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
import { Typography } from '@mui/material';
import { useContext } from 'react';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';

const Copyright = () => {
  const currentDate = new Date().getFullYear();
  const { siteName } = useContext(SiteCustomizationContext);

  return (
    <Typography variant="body2" align="center">
      All other content Copyright © 2020-{currentDate} {siteName}.
    </Typography>
  );
};

export default Copyright;
