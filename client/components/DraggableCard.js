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
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import FoilCardImage from '@cubeartisan/client/components/FoilCardImage';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

const DraggableCard = ({ card, location, canDrop, onMoveCard, className, onClick, ...props }) => {
  // eslint-disable-next-line react/prop-types
  delete props.width;
  // eslint-disable-next-line react/prop-types
  delete props.height;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'card', location },
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

  const [{ isAcceptable }, drop] = useDrop({
    accept: 'card',
    drop: () => location,
    canDrop: (item) => canDrop(item.location, location),
    collect: (monitor) => ({
      isAcceptable: !!monitor.isOver() && !!monitor.canDrop(),
    }),
  });

  const previewClasses = [].concat(isAcceptable ? ['outline'] : [], isDragging ? ['transparent'] : []);
  if (className) {
    Array.prototype.push.apply(previewClasses, className.split(' '));
  }

  const oldClasses = [].concat(['position-absolute'], isDragging ? ['transparent'] : ['d-none']);

  const typeLine = (card.type_line || card.details.type).toLowerCase();
  const cnc = typeLine.includes('creature');

  return (
    <>
      <FoilCardImage card={card} innerRef={imageRef} className={oldClasses.join(' ')} />
      <div ref={drag} className={onMoveCard ?? onClick ? 'clickable' : undefined}>
        <div ref={drop}>
          <FoilCardImage
            card={card}
            tags={[]}
            autocard
            className={previewClasses.join(' ')}
            data-location-type={location.type}
            data-location-data={JSON.stringify(location.data)}
            data-cnc={cnc.toString()}
            onClick={onClick}
            {...props}
          />
        </div>
      </div>
    </>
  );
};
DraggableCard.propTypes = {
  card: CardPropType.isRequired,
  location: PropTypes.shape({
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  canDrop: PropTypes.func.isRequired,
  onMoveCard: PropTypes.func.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
DraggableCard.defaultProps = {
  className: null,
  onClick: null,
};
export default DraggableCard;
