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
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Switch,
  Typography,
} from '@mui/material';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import AddToCubeModal from '@cubeartisan/client/components/modals/AddToCubeModal.js';
import PagedList from '@cubeartisan/client/components/containers/PagedList.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { cardName, cardNameLower, encodeName } from '@cubeartisan/client/utils/Card.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

const AutocardA = withAutocard(Link);
const AddModal = withModal(AutocardA, AddToCubeModal);

const elementWrapper = (element) => element;

const Suggestion = ({ card, score, index, cube }) => (
  <Typography variant="h6">
    {index + 1}
    {'. '}
    <AddModal
      front={card.details.image_normal}
      back={card.details.image_flip ?? undefined}
      href={`/card/${encodeName(card.cardID)}`}
      modalProps={{ card: card.details, hideAnalytics: false, cubeContext: cube._id }}
    >
      {cardName(card)}
    </AddModal>
    {` (${(score * 100).toFixed(2)}%)`}
  </Typography>
);

Suggestion.propTypes = {
  card: CardPropType.isRequired,
  score: PropTypes.number.isRequired,
  cube: CubePropType.isRequired,
  index: PropTypes.number.isRequired,
};

const Suggestions = ({ adds, cuts, loadState, cube, filter }) => {
  const { siteName } = useContext(SiteCustomizationContext);
  const [maybeOnly, toggleMaybeOnly] = useToggle(false);

  const filteredCuts = useMemo(() => {
    const withIndex = cuts?.map((cut, index) => [cut, index]) ?? [];
    return filter ? withIndex.filter(([{ card }]) => filter(card)) : withIndex;
  }, [cuts, filter]);

  const filteredAdds = useMemo(() => {
    let withIndex = adds?.map((add, index) => [add, index]) ?? [];
    if (maybeOnly) {
      withIndex = withIndex.filter(([{ card }]) =>
        cube.maybe.some((maybe) => cardNameLower(maybe) === cardNameLower(card)),
      );
    }
    return filter ? withIndex.filter(([card]) => filter(card)) : withIndex;
  }, [adds, maybeOnly, filter, cube.maybe]);

  return (
    <>
      <Typography variant="h4">Recommender</Typography>
      <Typography variant="subtitle1">
        View recommended additions and cuts. This data is generated using a machine learning algorithm trained over all
        cubes on {siteName}.
      </Typography>
      {loadState === 'error' ? (
        <Card>
          <CardHeader>
            <Typography variant="h5">Service Unavailable</Typography>
          </CardHeader>
          <CardContent>
            <Typography variant="body1">
              We encountered an unexpected error while connecting to the recommender. Please try again later.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader>
                <Typography variant="h6">Recommended Additions</Typography>
                <FormControl component="fieldset" variant="standard">
                  <FormControlLabel
                    control={<Switch checked={maybeOnly} onClick={toggleMaybeOnly} name="maybe-only" />}
                    label="Show cards from my Maybeboard only."
                  />
                </FormControl>
              </CardHeader>
              {loadState === 'loading' && (
                <CardContent sx={{ paddingY: 3 }}>
                  <CircularProgress sx={{ position: 'absolute' }} />
                </CardContent>
              )}
              {loadState === 'loaded' &&
                (filteredAdds.length > 0 ? (
                  <PagedList
                    pageSize={20}
                    showBottom
                    pageWrap={elementWrapper}
                    rows={filteredAdds.slice(0).map(([add, index]) => (
                      <Suggestion key={add.card.cardID} index={index} card={add.card} score={add.score} cube={cube} />
                    ))}
                  />
                ) : (
                  <CardContent>
                    <Typography variant="subtitle1" component="em">
                      No results with the given filter.
                    </Typography>
                  </CardContent>
                ))}
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardHeader>
                <Typography variant="h6">Recommended Cuts</Typography>
              </CardHeader>
              {loadState === 'loading' && (
                <CardContent sx={{ paddingY: 3 }}>
                  <CircularProgress sx={{ position: 'absolute' }} />
                </CardContent>
              )}
              {loadState === 'loaded' &&
                (filteredCuts.length > 0 ? (
                  <PagedList
                    pageSize={20}
                    showBottom
                    pageWrap={elementWrapper}
                    rows={filteredCuts.slice(0).map(([cut, index]) => (
                      <Suggestion key={cut.card.cardID} index={index} card={cut.card} score={cut.score} cube={cube} />
                    ))}
                  />
                ) : (
                  <CardContent>
                    <Typography variant="subtitle1" component="em">
                      No results with the given filter.
                    </Typography>
                  </CardContent>
                ))}
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Suggestions.propTypes = {
  adds: PropTypes.arrayOf(
    PropTypes.shape({ card: CardPropType.isRequired, score: PropTypes.number.isRequired }).isRequired,
  ).isRequired,
  cuts: PropTypes.arrayOf(
    PropTypes.shape({ card: CardPropType.isRequired, score: PropTypes.number.isRequired }).isRequired,
  ).isRequired,
  loadState: PropTypes.oneOf(['loading', 'loaded', 'error']).isRequired,
  cube: CubePropType.isRequired,
  filter: PropTypes.func,
};

Suggestions.defaultProps = {
  filter: null,
};

export default Suggestions;
