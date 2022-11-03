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
import { Box, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import CardStack from '@cubeartisan/client/components/CardStack.js';
import DraggableCard from '@cubeartisan/client/components/DraggableCard.js';
import Location from '@cubeartisan/client/drafting/DraftLocation.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

const DeckStacks = ({
  cards,
  title,
  subtitle,
  locationType,
  canDrop,
  onMoveCard,
  onClickCard,
  cardsInRow,
  ...props
}) => (
  <Box sx={{ height: '100%', minHeight: 320 }} {...props}>
    <Stack direction="row" sx={{ backgroundColor: 'background.darker' }} justifyContent="center" width="100%">
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1" marginLeft="auto">
        {subtitle}
      </Typography>
    </Stack>
    {cards.map((row, index) => (
      <Grid container columns={cardsInRow} key={/* eslint-disable-line react/no-array-index-key */ index}>
        {row.map((column, index2) => (
          <Grid item xs={1} key={/* eslint-disable-line react/no-array-index-key */ index2}>
            <CardStack location={new Location(locationType, [index, index2, 0])}>
              {column.map((card, index3) => (
                <div key={/* eslint-disable-line react/no-array-index-key */ index3} className="stacked">
                  <DraggableCard
                    location={new Location(locationType, [index, index2, index3 + 1])}
                    card={card}
                    canDrop={canDrop}
                    onMoveCard={onMoveCard}
                    onClick={onClickCard}
                  />
                </div>
              ))}
            </CardStack>
          </Grid>
        ))}
      </Grid>
    ))}
  </Box>
);
DeckStacks.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(CardPropType.isRequired).isRequired).isRequired)
    .isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  locationType: PropTypes.string.isRequired,
  onMoveCard: PropTypes.func,
  onClickCard: PropTypes.func,
  canDrop: PropTypes.func,
  cardsInRow: PropTypes.number,
};
DeckStacks.defaultProps = {
  subtitle: false,
  onMoveCard: () => {},
  onClickCard: () => {},
  canDrop: () => true,
  cardsInRow: 8,
};
export default DeckStacks;
