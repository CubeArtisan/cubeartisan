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
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import { usePickListAndDrafterState } from '@cubeartisan/client/components/DecksPickBreakdown.js';
import { SortableTable, compareStrings, percentRenderer } from '@cubeartisan/client/components/SortableTable.js';
import Tooltip from '@cubeartisan/client/components/Tooltip.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import { DrafterStatePropType, DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes.js';
import { COLOR_COMBINATIONS, cardName, encodeName } from '@cubeartisan/client/utils/Card.js';
import { fromEntries } from '@cubeartisan/client/utils/Util.js';
import { convertDrafterState, initializeMtgDraftbots } from '@cubeartisan/client/drafting/draftutil.js';
import PickSelector from '@cubeartisan/client/components/PickSelector.js';

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

const TRAITS = Object.freeze([
  // {
  //   title: 'Usability Percent',
  //   tooltip:
  //     'What percent of the rating of the card the bot thinks it can take advantage of. Based on the probability to cast the card on curve. Applies as scaling to Rating and Pick Synergy.',
  //   compute: ({ botState: { cardIndices, probabilities } }) => probabilities[cardIndices?.[0]] * 100,
  // },
  {
    title: 'Lands',
    tooltip: 'This is the color combination the bot is assuming that will maximize the total score.',
    compute: ({ lands }) =>
      JSON.stringify(
        fromEntries(COLOR_COMBINATIONS.map((c, i) => [c.length > 0 ? c : 'C', lands[i]]).filter(([, x]) => x)),
      ),
  },
  {
    title: 'Total Score',
    tooltip: 'The total calculated score.',
    compute: ({ score }) => score,
    renderFn: percentRenderer,
  },
]);

export const DraftbotBreakdownTable = ({ drafterState }) => {
  const [botResult, setBotResult] = useState(null);
  useEffect(() => {
    (async () => {
      const { calculateBotPick } = await import('mtgdraftbots');
      await initializeMtgDraftbots();
      const result = await calculateBotPick(convertDrafterState(drafterState));
      setBotResult(result);
    })();
  }, [drafterState]);
  const botEvaluations = useMemo(() => botResult?.scores ?? [], [botResult]);
  const [oracles, weights] = useMemo(() => {
    if (botEvaluations.length === 0) return [[], []];
    const iOracles = botEvaluations[0].oracleResults.map(({ title, tooltip }) => ({
      title,
      tooltip,
      renderFn: percentRenderer,
    }));
    const iWeights = botEvaluations[0].oracleResults.map(({ title, weight }) => ({ title, weight }));
    return [iOracles, iWeights];
  }, [botEvaluations]);
  const renderWithTooltip = (iTitle) => (
    <Tooltip text={oracles.find(({ title }) => title === iTitle)?.tooltip ?? ''}>{iTitle}</Tooltip>
  );
  const WEIGHT_COLUMNS = Object.freeze([
    { title: 'Oracle', sortable: true, key: 'title', heading: true, renderFn: renderWithTooltip },
    { title: 'Weight', sortable: true, key: 'weight', renderFn: percentRenderer },
  ]);
  const rows = useMemo(
    () =>
      botEvaluations
        .map((botEvaluation, idx) =>
          fromEntries([
            [CARD_TRAIT.title, drafterState.cards[drafterState.cardsInPack[idx]]],
            ...botEvaluation.oracleResults.map(({ title, value }) => [title, value]),
            ...TRAITS.map(({ title, compute }) => [title, compute(botEvaluation)]),
          ]),
        )
        .filter((row) => row[CARD_TRAIT.title]),
    [botEvaluations, drafterState.cards, drafterState.cardsInPack],
  );

  return (
    <>
      <SortableTable
        className="small-table"
        columnProps={[CARD_TRAIT, ...oracles, ...TRAITS].map((trait) => ({
          ...trait,
          key: trait.title,
          sortable: true,
        }))}
        data={rows}
        defaultSortConfig={{ key: 'Total Score', direction: 'descending' }}
        sortFns={{ Lands: compareStrings, Card: (a, b) => compareStrings(a.details.name, b.details.name) }}
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
