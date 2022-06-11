/*
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
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useContext, useEffect, useMemo, useState } from 'react';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { TagContextProvider } from '@cubeartisan/client/components/contexts/TagContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import CubeAnalyticPropType from '@cubeartisan/client/proptypes/CubeAnalyticPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import {
  cardCmc,
  cardDevotion,
  cardFoilPrice,
  cardName,
  cardNormalPrice,
  cardPower,
  cardPrice,
  cardPriceEur,
  cardTix,
  cardToughness,
  mainboardRate,
  pickRate,
} from '@cubeartisan/client/utils/Card.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { cardIsLabel, getLabels } from '@cubeartisan/client/utils/Sort.js';

const Averages = lazy(() => import('@cubeartisan/client/components/analytics/Averages.js'));
const Chart = lazy(() => import('@cubeartisan/client/components/analytics/Chart.js'));
const Tokens = lazy(() => import('@cubeartisan/client/components/analytics/Tokens.js'));
const Playtest = lazy(() => import('@cubeartisan/client/components/analytics/PlaytestData.js'));
const PivotTable = lazy(() => import('@cubeartisan/client/components/analytics/PivotTable.js'));
const AnalyticTable = lazy(() => import('@cubeartisan/client/components/analytics/AnalyticTable.js'));
const Cloud = lazy(() => import('@cubeartisan/client/components/analytics/Cloud.js'));
const HyperGeom = lazy(() => import('@cubeartisan/client/components/analytics/HyperGeom.js'));
const Suggestions = lazy(() => import('@cubeartisan/client/components/analytics/Suggestions.js'));
const Asfans = lazy(() => import('@cubeartisan/client/components/analytics/Asfans.js'));

const analytics = [
  {
    name: 'Averages',
    component: ({ characteristics, defaultFormatId, cube, setAsfans, collection }) => (
      <Averages
        cards={collection}
        characteristics={characteristics}
        defaultFormatId={defaultFormatId}
        cube={cube}
        setAsfans={setAsfans}
      />
    ),
  },
  {
    name: 'Table',
    component: ({ defaultFormatId, cube, setAsfans, collection }) => (
      <AnalyticTable cards={collection} setAsfans={setAsfans} defaultFormatId={defaultFormatId} cube={cube} />
    ),
  },
  {
    name: 'Asfans',
    component: ({ collection, cube, defaultFormatId }) => (
      <Asfans cards={collection} cube={cube} defaultFormatId={defaultFormatId} />
    ),
  },
  {
    name: 'Chart',
    component: ({ characteristics, defaultFormatId, cube, setAsfans, collection }) => (
      <Chart
        cards={collection}
        characteristics={characteristics}
        setAsfans={setAsfans}
        defaultFormatId={defaultFormatId}
        cube={cube}
      />
    ),
  },
  {
    name: 'Recommender',
    component: ({ cube, addCards, cutCards, filter, loading }) => (
      <Suggestions cube={cube} adds={addCards} cuts={cutCards} filter={filter} loadState={loading} />
    ),
  },
  {
    name: 'Playtest Data',
    component: ({ collection, cubeAnalytics }) => <Playtest cards={collection} cubeAnalytics={cubeAnalytics} />,
  },
  {
    name: 'Tokens',
    component: ({ cube }) => <Tokens cube={cube} />,
  },
  {
    name: 'Tag Cloud',
    component: ({ defaultFormatId, cube, setAsfans, collection }) => (
      <Cloud cards={collection} setAsfans={setAsfans} defaultFormatId={defaultFormatId} cube={cube} />
    ),
  },
  {
    name: 'Pivot Table',
    component: ({ collection, characteristics }) => <PivotTable cards={collection} characteristics={characteristics} />,
  },
  {
    name: 'Hypergeometric Calculator',
    component: () => <HyperGeom />,
  },
];

export const CubeAnalyticsPage = ({
  cube,
  cubeID,
  defaultFilterText,
  defaultTab,
  defaultFormatId,
  defaultShowTagColors,
  loginCallback,
  cubeAnalytics,
}) => {
  const { _id: userID } = useContext(UserContext);
  defaultFormatId = cube.defaultDraftFormat ?? -1;
  const [filter, setFilter] = useState(null);
  const [activeTab, setActiveTab] = useQueryParam('tab', defaultTab ?? 0);
  const [adds, setAdds] = useState([]);
  const [cuts, setCuts] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [filterCollapseOpen, toggleFilterCollapse] = useToggle(false);
  const [asfans, setAsfans] = useState({});

  const cards = useMemo(
    () => (filter ? cube.cards.filter(filter) : cube.cards).map((card) => ({ ...card, asfan: asfans[card.cardID] })),
    [asfans, cube, filter],
  );

  const cardAnalyticsDict = Object.fromEntries(
    cubeAnalytics.cards.map((cardAnalytic) => [cardAnalytic.cardName, cardAnalytic]),
  );

  const convertToCharacteristic = (name, func) => ({
    get: func,
    labels: (list) => getLabels(list, name),
    cardIsLabel: (card, label) => cardIsLabel(card, label.toString(), name),
  });

  const getCubeElo = (card) =>
    cardAnalyticsDict[cardName(card).toLowerCase()]
      ? Math.round(cardAnalyticsDict[cardName(card).toLowerCase()].elo)
      : null;

  const getPickRate = (card) =>
    cardAnalyticsDict[cardName(card).toLowerCase()] ? pickRate(cardAnalyticsDict[cardName(card).toLowerCase()]) : null;

  const getPickCount = (card) =>
    cardAnalyticsDict[cardName(card).toLowerCase()] ? cardAnalyticsDict[cardName(card).toLowerCase()].picks : null;

  const getMainboardRate = (card) =>
    cardAnalyticsDict[cardName(card).toLowerCase()]
      ? mainboardRate(cardAnalyticsDict[cardName(card).toLowerCase()])
      : null;

  const getMainboardCount = (card) =>
    cardAnalyticsDict[cardName(card).toLowerCase()] ? cardAnalyticsDict[cardName(card).toLowerCase()].mainboards : null;

  const characteristics = {
    'Mana Value': convertToCharacteristic('Mana Value', cardCmc),
    Power: convertToCharacteristic('Power', (card) => parseInt(cardPower(card), 10)),
    Toughness: convertToCharacteristic('Toughness', (card) => parseInt(cardToughness(card), 10)),
    Elo: convertToCharacteristic('Elo', (card) => parseFloat(card.details.elo, 10)),
    Price: convertToCharacteristic('Price', (card) => parseFloat(cardPrice(card), 10)),
    'Price USD': convertToCharacteristic('Price USD', (card) => parseFloat(cardNormalPrice(card))),
    'Price USD Foil': convertToCharacteristic('Price USD Foil', (card) => parseFloat(cardFoilPrice(card))),
    'Price EUR': convertToCharacteristic('Price EUR', (card) => parseFloat(cardPriceEur(card))),
    'MTGO TIX': convertToCharacteristic('MTGO TIX', (card) => parseFloat(cardTix(card))),
    'Cube Elo': {
      get: getCubeElo,
      labels: (list) =>
        getLabels(
          list.map((card) => {
            const newcard = JSON.parse(JSON.stringify(card));
            newcard.details.elo = getCubeElo(card);
            return newcard;
          }),
          'Elo',
        ),
      cardIsLabel: (card, label) => {
        const newcard = JSON.parse(JSON.stringify(card));
        newcard.details.elo = getCubeElo(card);

        return cardIsLabel(newcard, label, 'Elo');
      },
    },
    'Pick Rate': {
      get: getPickRate,
      labels: () => {
        const labels = [];
        for (let i = 0; i < 10; i++) {
          labels.push(`${i * 10}% - ${(i + 1) * 10}%`);
        }
        return labels;
      },
      cardIsLabel: (card, label) => {
        const v = Math.floor(getPickRate(card) * 10) * 10;
        return label === `${v}% - ${v + 10}%`;
      },
    },
    'Pick Count': {
      get: getPickCount,
      labels: (list) => {
        const set = new Set(list.map(getPickCount));

        return Array.from(set)
          .filter((c) => c)
          .sort();
      },
      cardIsLabel: (card, label) => getPickCount(card) === parseInt(label, 10),
    },
    'Mainboard Rate': {
      get: getMainboardRate,
      labels: () => {
        const labels = [];
        for (let i = 0; i < 10; i++) {
          labels.push(`${i * 10}% - ${(i + 1) * 10}%`);
        }
        return labels;
      },
      cardIsLabel: (card, label) => {
        const v = Math.floor(getMainboardRate(card) * 10) * 10;
        return label === `${v}% - ${v + 10}%`;
      },
    },
    'Mainboard Count': {
      get: getMainboardCount,
      labels: (list) => {
        const set = new Set(list.map(getMainboardCount));

        return Array.from(set)
          .filter((c) => c)
          .sort();
      },
      cardIsLabel: (card, label) => getMainboardCount(card) === parseInt(label, 10),
    },
    'Devotion to White': convertToCharacteristic('Devotion to White', (card) => cardDevotion(card, 'w').toString()),
    'Devotion to Blue': convertToCharacteristic('Devotion to Blue', (card) => cardDevotion(card, 'u').toString()),
    'Devotion to Black': convertToCharacteristic('Devotion to Black', (card) => cardDevotion(card, 'b').toString()),
    'Devotion to Red': convertToCharacteristic('Devotion to Red', (card) => cardDevotion(card, 'r').toString()),
    'Devotion to Green': convertToCharacteristic('Devotion to Green', (card) => cardDevotion(card, 'g').toString()),
  };

  async function getData(url = '') {
    // Default options are marked with *
    const response = await csrfFetch(url, { method: 'GET' });
    const val = await response.json(); // parses JSON response into native JavaScript objects
    return val.result;
  }

  useEffect(() => {
    (async () => {
      try {
        const { toCut, toAdd } = await getData(`/cube/${cubeID}/recommend`);
        setAdds(toAdd);
        setCuts(toCut);
        setLoading('loaded');
      } catch (err) {
        setLoading('error');
        console.warn(err);
      }
    })();
  }, [cubeID]);

  const defaultTagSet = new Set(cube.cards.flatMap((card) => card.tags));
  const defaultTags = Array.from(defaultTagSet, (tag) => ({
    id: tag,
    text: tag,
  }));

  return (
    <CubeLayout cube={cube} activeLink="analysis" loginCallback={loginCallback}>
      <TagContextProvider
        cubeID={cube._id}
        defaultTagColors={cube.tag_colors}
        defaultShowTagColors={defaultShowTagColors}
        defaultTags={defaultTags}
        userID={userID}
      >
        <DynamicFlash />
        {cube.cards.length === 0 ? (
          <Typography variant="h5">This cube doesn't have any cards. Add cards to see analytics.</Typography>
        ) : (
          <Grid container sx={{ paddingY: 1 }}>
            <Grid item xs={12} lg={2} sx={{ paddingRight: 2, paddingTop: 0 }}>
              <Box
                sx={{
                  backgroundColor: 'background.hover',
                  flexDirection: 'column',
                  display: 'flex',
                  height: '100%',
                }}
              >
                {analytics.map((analytic, index) => (
                  <Button
                    key={analytic.name}
                    variant={activeTab === index ? 'outlined' : 'text'}
                    onClick={() => setActiveTab(index)}
                    sx={{ marginY: 1 }}
                  >
                    {analytic.name}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid xs={12} lg={10}>
              <Card>
                <CardContent>
                  <Button onClick={toggleFilterCollapse}>
                    <Typography variant="h5">{filterCollapseOpen ? 'Hide Filter' : 'Show Filter'}</Typography>
                  </Button>
                  <FilterCollapse
                    numShown={cards.length}
                    numCards={cube.cards.length}
                    noCount={false}
                    defaultFilterText={defaultFilterText}
                    filter={filter}
                    setFilter={setFilter}
                    isOpen={filterCollapseOpen}
                  />
                </CardContent>
              </Card>
              <Card sx={{ marginTop: 2 }}>
                <CardContent>
                  <ErrorBoundary>
                    <Suspense>
                      {analytics[activeTab].component({
                        collection: cards,
                        cube,
                        toAdd: adds,
                        toCut: cuts,
                        loading,
                        characteristics,
                        defaultFormatId,
                        setAsfans,
                      })}
                    </Suspense>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </TagContextProvider>
    </CubeLayout>
  );
};
CubeAnalyticsPage.propTypes = {
  cube: CubePropType.isRequired,
  cubeID: PropTypes.string.isRequired,
  defaultFilterText: PropTypes.string,
  defaultTab: PropTypes.number,
  defaultFormatId: PropTypes.number,
  defaultShowTagColors: PropTypes.bool,
  loginCallback: PropTypes.string,
  cubeAnalytics: CubeAnalyticPropType.isRequired,
};
CubeAnalyticsPage.defaultProps = {
  defaultFilterText: '',
  defaultTab: 0,
  defaultFormatId: null,
  defaultShowTagColors: true,
  loginCallback: '/',
};
export default RenderToRoot(CubeAnalyticsPage);
