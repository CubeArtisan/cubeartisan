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
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType';
import CubeAnalyticPropType from '@cubeartisan/client/proptypes/CubeAnalyticPropType';

import { compareStrings, SortableTable } from '@cubeartisan/client/components/SortableTable';
import { fromEntries } from '@cubeartisan/client/utils/Util';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary';
import { mainboardRate, pickRate, encodeName } from '@cubeartisan/client/utils/Card';

import withAutocard from '@cubeartisan/client/components/WithAutocard';

const AutocardItem = withAutocard(ListGroupItem);

const renderCardLink = (card) => (
  <AutocardItem className="p-0" key={card.index} card={card} data-in-modal index={card.index}>
    <a href={`/card/${encodeName(card.cardID)}`} target="_blank" rel="noopener noreferrer">
      {card.details.name}
    </a>
  </AutocardItem>
);

const renderPercent = (val) => {
  return <>{parseInt(val * 1000, 10) / 10}%</>;
};

const PlaytestData = ({ cards: allCards, cubeAnalytics }) => {
  const cardDict = useMemo(
    () => fromEntries(allCards.map((card) => [card.details.name.toLowerCase(), card])),
    [allCards],
  );

  const data = useMemo(
    () =>
      cubeAnalytics.cards
        .filter((cardAnalytic) => cardDict[cardAnalytic.cardName])
        .map(({ cardName, elo, mainboards, sideboards, picks, passes }) => ({
          card: {
            exportValue: cardName,
            ...cardDict[cardName],
          },
          elo: Math.round(elo),
          mainboard: mainboardRate({ mainboards, sideboards }),
          pickrate: pickRate({ picks, passes }),
          picks,
          mainboards,
        })),
    [cubeAnalytics, cardDict],
  );

  return (
    <>
      <ErrorBoundary>
        <SortableTable
          columnProps={[
            {
              key: 'card',
              title: 'Card Name',
              heading: true,
              sortable: true,
              renderFn: renderCardLink,
            },
            { key: 'elo', title: 'Cube Elo', sortable: true, heading: false },
            { key: 'pickrate', title: 'Pick Rate', sortable: true, heading: false, renderFn: renderPercent },
            { key: 'picks', title: 'Pick Count', sortable: true, heading: false },
            { key: 'mainboard', title: 'Mainboard Rate', sortable: true, heading: false, renderFn: renderPercent },
            { key: 'mainboards', title: 'Mainboard Count', sortable: true, heading: false },
          ]}
          data={data}
          sortFns={{ label: compareStrings }}
        />
      </ErrorBoundary>
    </>
  );
};

PlaytestData.propTypes = {
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  cubeAnalytics: CubeAnalyticPropType.isRequired,
};

export default PlaytestData;
