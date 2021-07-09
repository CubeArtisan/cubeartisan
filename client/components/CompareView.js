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
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import { getLabels, sortIntoGroups } from '@cubeartisan/client/utils/Sort.js';
import AutocardListItem from '@cubeartisan/client/components/AutocardListItem.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { useContext } from 'react';

const CompareGroup = ({ heading, both, onlyA, onlyB }) => {
  const bothCmc = sortIntoGroups(both, 'Mana Value');
  const onlyACmc = sortIntoGroups(onlyA, 'Mana Value');
  const onlyBCmc = sortIntoGroups(onlyB, 'Mana Value');

  return (
    <ListGroup className="list-outline">
      <ListGroupItem className="list-group-heading px-0">
        {heading}
        <Row noGutters>
          <Col>({both.length})</Col>
          <Col>({onlyA.length})</Col>
          <Col>({onlyB.length})</Col>
        </Row>
      </ListGroupItem>
      {getLabels(null, 'Mana Value')
        .filter((cmc) => onlyACmc[cmc] || bothCmc[cmc] || onlyBCmc[cmc])
        .map((cmc) => (
          <Row key={cmc} noGutters className="cmc-group">
            {[
              [bothCmc, 'both'],
              [onlyACmc, 'a'],
              [onlyBCmc, 'b'],
            ].map(([cards, key]) => (
              <Col xs="4" key={key}>
                {(cards[cmc] || []).map((card, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <AutocardListItem key={index} card={card} />
                ))}
              </Col>
            ))}
          </Row>
        ))}
    </ListGroup>
  );
};
CompareGroup.propTypes = {
  heading: PropTypes.string.isRequired,
  both: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  onlyA: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  onlyB: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
};

const CompareView = ({ cards, both, onlyA, onlyB, ...props }) => {
  const { primary, secondary, showOther } = useContext(SortContext);
  const columns = sortIntoGroups(cards, primary, showOther);
  const columnCounts = {};
  const bothCounts = { total: 0 };
  const onlyACounts = { total: 0 };
  const onlyBCounts = { total: 0 };

  const bothCopy = both.slice(0);
  const onlyACopy = onlyA.slice(0);
  const onlyBCopy = onlyB.slice(0);

  for (const columnLabel of Object.keys(columns)) {
    let onlyACount = 0;
    let onlyBCount = 0;
    let bothCount = 0;
    for (const card of columns[columnLabel]) {
      if (bothCopy.includes(card.details.name)) {
        bothCount += 1;
        bothCopy.splice(bothCopy.indexOf(card.details.name), 1);
      } else if (onlyACopy.includes(card.details.name)) {
        onlyACount += 1;
        onlyACopy.splice(onlyACopy.indexOf(card.details.name), 1);
      } else if (onlyBCopy.includes(card.details.name)) {
        onlyBCount += 1;
        onlyBCopy.splice(onlyBCopy.indexOf(card.details.name), 1);
      }
    }

    columnCounts[columnLabel] = columns[columnLabel].length;
    bothCounts[columnLabel] = bothCount;
    bothCounts.total += bothCount;
    onlyACounts[columnLabel] = onlyACount;
    onlyACounts.total += onlyACount;
    onlyBCounts[columnLabel] = onlyBCount;
    onlyBCounts.total += onlyBCount;
    columns[columnLabel] = sortIntoGroups(columns[columnLabel], secondary, showOther);
  }
  const bothCopy2 = both.slice(0);
  const onlyACopy2 = onlyA.slice(0);
  const onlyBCopy2 = onlyB.slice(0);

  return (
    <>
      {
        <div className="compare-header pt-2">
          <Row>
            <Col>
              <h6 className="text-center">Total</h6>
            </Col>
          </Row>
          <Row>
            <Col xs="4">
              <h6 className="text-center">
                In Both Cubes
                <br />({bothCounts.total})
              </h6>
            </Col>
            <Col xs="4">
              <h6 className="text-center">
                Only in Base Cube
                <br />({onlyACounts.total})
              </h6>
            </Col>
            <Col xs="4">
              <h6 className="text-center">
                Only in Comparison Cube
                <br />({onlyBCounts.total})
              </h6>
            </Col>
          </Row>
        </div>
      }
      {getLabels(cards, primary, showOther)
        .filter((columnLabel) => columns[columnLabel])
        .map((columnLabel) => {
          const column = columns[columnLabel];
          return (
            <Row key={columnLabel} {...props}>
              <Col xs="12" md="10" lg="8" className="mx-auto">
                <div className="compare-header pt-2">
                  <Row>
                    <Col>
                      <h6 className="text-center">{columnLabel}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4">
                      <h6 className="text-center">
                        In Both Cubes
                        <br />({bothCounts[columnLabel]})
                      </h6>
                    </Col>
                    <Col xs="4">
                      <h6 className="text-center">
                        Only in Base Cube
                        <br />({onlyACounts[columnLabel]})
                      </h6>
                    </Col>
                    <Col xs="4">
                      <h6 className="text-center">
                        Only in Comparison Cube
                        <br />({onlyBCounts[columnLabel]})
                      </h6>
                    </Col>
                  </Row>
                </div>
                {getLabels(column, secondary, showOther)
                  .filter((label) => column[label])
                  .map((label) => {
                    const group = column[label];
                    const bothGroup = [];
                    const onlyAGroup = [];
                    const onlyBGroup = [];

                    for (const card of group) {
                      if (bothCopy2.includes(card.details.name)) {
                        bothGroup.push(card);
                        bothCopy2.splice(bothCopy2.indexOf(card.details.name), 1);
                      } else if (onlyACopy2.includes(card.details.name)) {
                        onlyAGroup.push(card);
                        onlyACopy2.splice(onlyACopy2.indexOf(card.details.name), 1);
                      } else if (onlyBCopy2.includes(card.details.name)) {
                        onlyBGroup.push(card);
                        onlyBCopy2.splice(onlyBCopy2.indexOf(card.details.name), 1);
                      }
                    }
                    return (
                      <CompareGroup
                        key={label}
                        heading={label}
                        both={bothGroup}
                        onlyA={onlyAGroup}
                        onlyB={onlyBGroup}
                      />
                    );
                  })}
              </Col>
            </Row>
          );
        })}
    </>
  );
};
CompareView.propTypes = {
  both: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  onlyA: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  onlyB: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
};

export default CompareView;
