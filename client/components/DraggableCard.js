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
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import CardImage from '@cubeartisan/client/components/CardImage.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { cardType } from '@cubeartisan/client/utils/Card.js';

const AutocardImage = withAutocard(CardImage);

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 */

/**
 * @typedef Location
 * @property {string} type
 * @property {number[]} data
 */

/**
 * @typedef DraggableCardProps
 * @property {Card} card
 * @property {Location} location
 * @property {(l1: Location, l2: Location) => boolean} canDrop
 * @property {Function} onMoveCard
 * @property {React.MouseEventHandler<HTMLImageElement>?} [onClick]
 */

/** @type {React.FC<DraggableCardProps>} */
const DraggableCard = ({ card, location, canDrop, onMoveCard, onClick, ...props }) => {
  const [, drag, preview] = useDrag({
    type: 'card',
    item: { location },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onMoveCard(item.location, monitor.getDropResult());
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const imageRef = useRef();
  preview(imageRef);

  const [, drop] = useDrop({
    accept: 'card',
    drop: () => location,
    canDrop:
      /** @param {{ location: Location }} item */
      (item) => canDrop(item.location, location),
    collect: (monitor) => ({
      isAcceptable: !!monitor.isOver() && !!monitor.canDrop(),
    }),
  });

  const typeLine = cardType(card)?.toLowerCase?.();
  const cmc = typeLine.includes('creature');

  return (
    <div ref={drag}>
      <div ref={drop}>
        <AutocardImage
          card={card}
          tags={[]}
          data-location-type={location.type}
          data-location-data={JSON.stringify(location.data)}
          data-cmc={cmc.toString()}
          onClick={onClick ?? undefined}
          {...props}
        />
      </div>
    </div>
  );
};
DraggableCard.propTypes = {
  // @ts-ignore
  card: CardPropType.isRequired,
  location: PropTypes.shape({
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  canDrop: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
  // @ts-ignore
  onClick: PropTypes.func,
};
DraggableCard.defaultProps = {
  onClick: null,
};
export default DraggableCard;
