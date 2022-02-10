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
import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import { usePickListAndDrafterState } from '@cubeartisan/client/components/DecksPickBreakdown.js';
import { SortableTable, compareStrings } from '@cubeartisan/client/components/SortableTable.js';
import Tooltip from '@cubeartisan/client/components/Tooltip.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import { DrafterStatePropType, DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes.js';
import { cardName, encodeName } from '@cubeartisan/client/utils/Card.js';
import { convertDrafterState, getDraftbotScores } from '@cubeartisan/client/drafting/draftutil.js';
import PickSelector from '@cubeartisan/client/components/PickSelector.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';

const AutocardLink = withAutocard('a');

const CARD_TRAIT = Object.freeze({
  title: 'Card',
  tooltip: 'The card the bot is considering',
  heading: true,
  renderFn: (card) => {
    const { index, cardID } = card;
    return (
      <AutocardLink
        href={`/card/${encodeName(cardID)}`}
        card={card}
        target="_blank"
        rel="noopener noreferrer"
        key={index}
      >
        {cardName(card)}
      </AutocardLink>
    );
  },
});

const SCORE_TRAIT = Object.freeze({
  title: 'Final Score',
  tooltip: 'The score that combines all the oracles together.',
});

export const DraftbotBreakdownTable = ({ drafterState }) => {
  const [botResult, setBotResult] = useState(null);
  const { mtgmlServer } = useContext(SiteCustomizationContext);
  useEffect(() => {
    (async () => {
      const result = await getDraftbotScores(convertDrafterState(drafterState), mtgmlServer, true);
      console.log(result);
      setBotResult(result);
    })();
  }, [drafterState, mtgmlServer]);
  const [oracles, weights] = useMemo(() => {
    if ((botResult?.oracles?.length ?? 0) === 0) return [[], []];
    const iOracles = botResult.oracles[0].map(({ title, tooltip }) => ({
      title,
      tooltip,
    }));
    const iWeights = botResult.oracles[0].map(({ title, weight }) => ({ title, weight }));
    return [iOracles, iWeights];
  }, [botResult]);
  const renderWithTooltip = (iTitle) => (
    <Tooltip text={oracles.find(({ title }) => title === iTitle)?.tooltip ?? ''}>{iTitle}</Tooltip>
  );
  const WEIGHT_COLUMNS = [
    { title: 'Oracle', sortable: true, key: 'title', heading: true, renderFn: renderWithTooltip },
    { title: 'Weight', sortable: true, key: 'weight' },
  ];
  const rows = useMemo(
    () =>
      botResult?.oracles
        ?.map?.((oracleResults, idx) =>
          Object.fromEntries([
            [CARD_TRAIT.title, drafterState.cards[drafterState.cardsInPack[idx]]],
            ...oracleResults.map(({ title, score }) => [title, score]),
            [SCORE_TRAIT.title, botResult.scores[idx]],
          ]),
        )
        ?.filter?.((row) => row[CARD_TRAIT.title]) ?? [],
    [botResult, drafterState.cards, drafterState.cardsInPack],
  );

  return (
    <>
      <SortableTable
        className="small-table"
        columnProps={[CARD_TRAIT, ...oracles, SCORE_TRAIT].map((trait) => ({
          ...trait,
          key: trait.title,
          sortable: true,
        }))}
        data={rows}
        defaultSortConfig={{ key: 'Total Score', direction: 'descending' }}
        sortFns={{ Lands: compareStrings, Card: (a, b) => compareStrings(cardName(a), cardName(b)) }}
      />
      <h4 className="mt-4 mb-2">{`Pack ${drafterState.packNum + 1}: Pick ${drafterState.pickNum + 1} Weights`}</h4>
      <SortableTable
        className="small-table"
        columnProps={WEIGHT_COLUMNS}
        data={weights}
        sortFns={{ title: compareStrings }}
      />
    </>
  );
};

DraftbotBreakdownTable.propTypes = {
  drafterState: DrafterStatePropType.isRequired,
};

const DraftbotBreakdown = (props) => {
  const { picksList, drafterState, setPickNumberFromEvent } = usePickListAndDrafterState(props);

  return (
    <Row>
      <Col xs={12} sm={3}>
        <PickSelector
          picksList={picksList}
          curPickNumber={drafterState.pickNumber}
          setPickNumberFromEvent={setPickNumberFromEvent}
        />
      </Col>
      <Col xs={12} sm={9}>
        <h4 className="mt-5 mb-2">{`Pack ${drafterState.packNum + 1}: Pick ${drafterState.pickNum + 1} Cards`}</h4>
        <DraftbotBreakdownTable drafterState={drafterState} />
      </Col>
    </Row>
  );
};

DraftbotBreakdown.propTypes = {
  // eslint-disable-next-line
  draft: DraftPropType.isRequired,
  // eslint-disable-next-line
  seatIndex: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
  // eslint-disable-next-line
  defaultIndex: PropTypes.number,
};

DraftbotBreakdown.defaultProps = {
  defaultIndex: 0,
};

export default DraftbotBreakdown;
