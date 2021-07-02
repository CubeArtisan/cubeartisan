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
import { useContext, forwardRef } from 'react';

import DisplayContext from '@hypercube/client/contexts/DisplayContext';

/* HOC to add autocard to another element */

const handleMouseEnter = (event) => {
  const target = event.currentTarget;
  const front = target.getAttribute('data-front');
  const back = target.getAttribute('data-back');
  const tags = JSON.parse(target.getAttribute('data-tags') || '[]');
  const foil = target.getAttribute('data-foil') === 'true';
  const inModal = target.getAttribute('data-in-modal') === 'true';
  if (!stopAutocard) {
    /* global */
    autocard_show_card(front, back, false, tags.length > 0 ? tags : null, foil, inModal);
  }
};

const handleMouseLeave = (event) => /* global */ autocard_hide_card();

const withAutocard = (Tag) =>
  forwardRef(({ card, front, back, tags, inModal, ...props }, ref) => {
    const { showCustomImages } = useContext(DisplayContext);
    card = card || { details: {} };
    tags = tags || card.tags || [];
    front = front || (showCustomImages && card.imgUrl) || card.details.image_normal;
    back = back || (showCustomImages && card.imgBackUrl) || card.details.image_flip;
    return (
      <Tag
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-front={front}
        data-back={back}
        data-tags={JSON.stringify(tags)}
        data-foil={card.finish === 'Foil'}
        data-in-modal={!!inModal}
        {...props}
      />
    );
  });

export default withAutocard;
