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
import { Box, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import AutocardListGroup from '@cubeartisan/client/components/AutocardListGroup.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { getLabels, sortDeep } from '@cubeartisan/client/utils/Sort.js';

const cmc2Labels = getLabels([], 'Mana Value 2');

/**
 * @typedef TypeRowProps
 * @property {string} cardType
 * @property {Card[]} group
 */

/**
 * @type {React.FC<TypeRowProps>}
 */
const TypeRow = ({ cardType, group }) => {
  const sorted = Object.fromEntries(sortDeep(group, false, 'Alphabetical', 'Mana Value 2'));
  return (
    <>
      <Typography variant="h6">
        {cardType} ({group.length})
      </Typography>
      <Box component="span">
        {cmc2Labels.map((cmc) => (
          <Box key={cmc} sx={{ aspectRatio: cmc2Labels.length }}>
            <AutocardListGroup
              heading={`${cmc} (${(sorted[cmc] || []).length})`}
              cards={sorted[cmc] || []}
              sort="Unsorted"
            />
          </Box>
        ))}
      </Box>
    </>
  );
};
TypeRow.propTypes = {
  cardType: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
};

const ColorCard = ({ color, group }) => (
  <Card sx={{ marginBottom: 0 }}>
    <CardContent>
      <Typography align="center" variant="h5" sx={{ marginBottom: 0 }}>
        {color} {group.length}
      </Typography>
      {sortDeep(group, false, 'Alphabetical', 'Creature/Non-Creature').map(([label, cmcGroup]) => (
        <TypeRow key={label} cardType={label} group={cmcGroup} />
      ))}
    </CardContent>
  </Card>
);

ColorCard.propTypes = {
  color: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const CurveView = ({ cards, ...props }) => {
  const { primary, showOther } = useContext(SortContext);

  // We call the groups color and type even though they might be other sorts.
  return (
    <Box {...props}>
      {sortDeep(cards, showOther, 'Alphabetical', primary).map(([color, group]) => (
        <ColorCard key={color} color={color} group={group} />
      ))}
    </Box>
  );
};

CurveView.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CurveView;
