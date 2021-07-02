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
import PropTypes from 'prop-types';
import { CardBody, CardHeader, CardTitle, Row } from 'reactstrap';

import CardStack from '@cubeartisan/client/components/CardStack';
import DraggableCard from '@cubeartisan/client/components/DraggableCard';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';
import Location from '@cubeartisan/client/drafting/DraftLocation';

const DeckStacks = ({ cards, title, subtitle, locationType, canDrop, onMoveCard, onClickCard, ...props }) => (
  <>
    <CardHeader {...props}>
      <CardTitle className="mb-0 d-flex flex-row align-items-end">
        <h4 className="mb-0 mr-auto">{title}</h4>
        <h6 className="mb-0 font-weight-normal d-sm-block">{subtitle}</h6>
      </CardTitle>
    </CardHeader>
    <CardBody className="pt-0">
      {cards.map((row, index) => (
        <Row key={/* eslint-disable-line react/no-array-index-key */ index} className="row-low-padding">
          {row.map((column, index2) => (
            <CardStack
              key={/* eslint-disable-line react/no-array-index-key */ index2}
              location={new Location(locationType, [index, index2, 0])}
            >
              {column.map((card, index3) => (
                <div className="stacked" key={/* eslint-disable-line react/no-array-index-key */ index3}>
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
          ))}
        </Row>
      ))}
    </CardBody>
  </>
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
};

DeckStacks.defaultProps = {
  subtitle: false,
  onMoveCard: () => {},
  onClickCard: () => {},
  canDrop: () => true,
};

export default DeckStacks;
