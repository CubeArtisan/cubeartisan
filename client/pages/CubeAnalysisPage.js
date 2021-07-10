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
import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Nav, NavLink, Row, Card, CardBody } from 'reactstrap';

import Averages from '@cubeartisan/client/analytics/Averages.js';
import Chart from '@cubeartisan/client/analytics/Chart.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import Tokens from '@cubeartisan/client/analytics/Tokens.js';
import Playtest from '@cubeartisan/client/analytics/PlaytestData.js';
import PivotTable from '@cubeartisan/client/analytics/PivotTable.js';
import AnalyticTable from '@cubeartisan/client/analytics/AnalyticTable.js';
import Cloud from '@cubeartisan/client/analytics/Cloud.js';
import HyperGeom from '@cubeartisan/client/analytics/HyperGeom.js';
import Suggestions from '@cubeartisan/client/analytics/Suggestions.js';
import Asfans from '@cubeartisan/client/analytics/Asfans.js';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import { TagContextProvider } from '@cubeartisan/client/components/contexts/TagContext.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import CubeAnalyticPropType from '@cubeartisan/client/proptypes/CubeAnalyticPropType.js';
import {
  cardCmc,
  cardDevotion,
  cardFoilPrice,
  cardNormalPrice,
  cardPower,
  cardPrice,
  cardToughness,
  cardPriceEur,
  cardTix,
  mainboardRate,
  pickRate,
} from '@cubeartisan/client/utils/Card.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { fromEntries } from '@cubeartisan/client/utils/Util.js';
import { getLabels, cardIsLabel } from '@cubeartisan/client/utils/Sort.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';

export const CubeAnalysisPage = ({
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

  const cards = useMemo(() => {
    return (filter ? cube.cards.filter(filter) : cube.cards).map((card) => ({ ...card, asfan: asfans[card.cardID] }));
  }, [asfans, cube, filter]);

  const cardAnalyticsDict = fromEntries(
    cubeAnalytics.cards.map((cardAnalytic) => [cardAnalytic.cardName, cardAnalytic]),
  );

  const convertToCharacteristic = (name, func) => ({
    get: func,
    labels: (list) => getLabels(list, name),
    cardIsLabel: (card, label) => cardIsLabel(card, label.toString(), name),
  });

  const getCubeElo = (card) =>
    cardAnalyticsDict[card.details.name.toLowerCase()]
      ? Math.round(cardAnalyticsDict[card.details.name.toLowerCase()].elo)
      : null;

  const getPickRate = (card) =>
    cardAnalyticsDict[card.details.name.toLowerCase()]
      ? pickRate(cardAnalyticsDict[card.details.name.toLowerCase()])
      : null;

  const getPickCount = (card) =>
    cardAnalyticsDict[card.details.name.toLowerCase()]
      ? cardAnalyticsDict[card.details.name.toLowerCase()].picks
      : null;

  const getMainboardRate = (card) =>
    cardAnalyticsDict[card.details.name.toLowerCase()]
      ? mainboardRate(cardAnalyticsDict[card.details.name.toLowerCase()])
      : null;

  const getMainboardCount = (card) =>
    cardAnalyticsDict[card.details.name.toLowerCase()]
      ? cardAnalyticsDict[card.details.name.toLowerCase()].mainboards
      : null;

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

  const analytics = [
    {
      name: 'Averages',
      component: (collection) => (
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
      component: (collection) => (
        <AnalyticTable cards={collection} setAsfans={setAsfans} defaultFormatId={defaultFormatId} cube={cube} />
      ),
    },
    {
      name: 'Asfans',
      component: (collection) => <Asfans cards={collection} cube={cube} defaultFormatId={defaultFormatId} />,
    },
    {
      name: 'Chart',
      component: (collection) => (
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
      component: (collection, cubeObj, addCards, cutCards, loadState) => (
        <Suggestions
          cards={collection}
          cube={cubeObj}
          adds={addCards}
          cuts={cutCards}
          filter={filter}
          loadState={loadState}
        />
      ),
    },
    {
      name: 'Playtest Data',
      component: (collection) => <Playtest cards={collection} cubeAnalytics={cubeAnalytics} />,
    },
    {
      name: 'Tokens',
      component: (_, cubeObj) => <Tokens cube={cubeObj} />,
    },
    {
      name: 'Tag Cloud',
      component: (collection) => (
        <Cloud cards={collection} setAsfans={setAsfans} defaultFormatId={defaultFormatId} cube={cube} />
      ),
    },
    {
      name: 'Pivot Table',
      component: (collection) => <PivotTable cards={collection} characteristics={characteristics} />,
    },
    {
      name: 'Hypergeometric Calculator',
      component: (collection) => <HyperGeom cards={collection} />,
    },
  ];

  async function getData(url = '') {
    // Default options are marked with *
    const response = await csrfFetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
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
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} canEdit={false} activeLink="analysis">
        <TagContextProvider
          cubeID={cube._id}
          defaultTagColors={cube.tag_colors}
          defaultShowTagColors={defaultShowTagColors}
          defaultTags={defaultTags}
          userID={userID}
        >
          <DynamicFlash />
          {cube.cards.length === 0 ? (
            <h5 className="mt-3 mb-3">This cube doesn't have any cards. Add cards to see analytics.</h5>
          ) : (
            <Row className="mt-3">
              <Col xs="12" lg="2">
                <Nav vertical="lg" pills className="justify-content-sm-start justify-content-center mb-3">
                  {analytics.map((analytic, index) => (
                    <NavLink
                      key={analytic.name}
                      active={activeTab === index}
                      onClick={() => setActiveTab(index)}
                      href="#"
                    >
                      {analytic.name}
                    </NavLink>
                  ))}
                </Nav>
              </Col>
              <Col xs="12" lg="10" className="overflow-x">
                <Card className="mb-3">
                  <CardBody>
                    <NavLink href="#" onClick={toggleFilterCollapse}>
                      <h5>{filterCollapseOpen ? 'Hide Filter' : 'Show Filter'}</h5>
                    </NavLink>
                    <FilterCollapse
                      defaultFilterText={defaultFilterText}
                      filter={filter}
                      setFilter={setFilter}
                      numCards={cards.length}
                      isOpen={filterCollapseOpen}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <ErrorBoundary>{analytics[activeTab].component(cards, cube, adds, cuts, loading)}</ErrorBoundary>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </TagContextProvider>
      </CubeLayout>
    </MainLayout>
  );
};

CubeAnalysisPage.propTypes = {
  cube: CubePropType.isRequired,
  cubeID: PropTypes.string.isRequired,
  defaultFilterText: PropTypes.string,
  defaultTab: PropTypes.number,
  defaultFormatId: PropTypes.number,
  defaultShowTagColors: PropTypes.bool,
  loginCallback: PropTypes.string,
  cubeAnalytics: CubeAnalyticPropType.isRequired,
};

CubeAnalysisPage.defaultProps = {
  defaultFilterText: '',
  defaultTab: 0,
  defaultFormatId: null,
  defaultShowTagColors: true,
  loginCallback: '/',
};

export default RenderToRoot(CubeAnalysisPage);
