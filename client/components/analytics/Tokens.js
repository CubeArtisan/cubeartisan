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
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import MassBuyButton from '@cubeartisan/client/components/inputs/MassBuyButton.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import { getTCGLink } from '@cubeartisan/client/utils/Affiliate.js';
import { cardName } from '@cubeartisan/client/utils/Card.js';

const compareCards = (x, y) => cardName(x).localeCompare(cardName(y));
const sortCards = (cards) => Array.from(cards).sort(compareCards);

const dedupeCards = (cards) => {
  const map = new Map();
  for (const card of Array.from(cards).reverse()) {
    map.set(cardName(card), card);
  }
  return Array.from(map.values());
};

const Tokens = ({ cube }) => {
  const positioned = cube.cards.map((card, index) => ({ ...card, position: index }));
  const byOracleId = {};
  for (const card of positioned) {
    for (const token of card.details.tokens || []) {
      const oracleId = token.details.oracle_id;
      if (!byOracleId[oracleId]) {
        byOracleId[oracleId] = {
          token,
          cards: [],
        };
      }
      // TODO: Use most recent printing for this oracle ID.
      byOracleId[oracleId].cards.push(card);
    }
  }

  const sorted = Array.from(Object.entries(byOracleId));
  sorted.sort((x, y) => compareCards(x[1].token, y[1].token));
  const data = sorted.map(([, tokenData]) => ({
    card: tokenData.token,
    cardDescription: sortCards(dedupeCards(tokenData.cards))
      .map(({ position }) => `[[${cardName(cube.cards[position])}|${cube.cards[position].details._id}]]`)
      .join('\n\n'),
  }));

  return (
    <>
      <Typography variant="h4" key="title">
        Tokens
      </Typography>
      <Typography variant="subtitle1">
        All the tokens and emblems your cube uses and what cards require each of them.
      </Typography>
      <MassBuyButton color="success" cards={data.map(({ card }) => card)}>
        Buy All Tokens
      </MassBuyButton>
      <Grid container spacing={1} columns={{ xs: 12, md: 12, lg: 12, xl: 15 }}>
        {data.map(({ card, cardDescription }) => (
          <Grid item key={card.cardID} xs={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: 'background.hover' }}>
              <CardContent>
                <CardMedia
                  component="img"
                  href={getTCGLink(card)}
                  src={card.details.image_normal}
                  className="card-img-top"
                  alt={cardName(card)}
                />
                <Markdown markdown={cardDescription} cube={cube} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Tokens.propTypes = {
  cube: PropTypes.shape({
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        details: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
    draft_formats: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
export default Tokens;
