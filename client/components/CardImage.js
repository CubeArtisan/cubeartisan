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
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useCallback, useContext } from 'react';

import CardModalContext from '@cubeartisan/client/components/contexts/CardModalContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { CARD_CATEGORY_DETECTORS, cardImageBackUrl, cardImageUrl, cardName } from '@cubeartisan/client/utils/Card.js';

const CardImage = forwardRef(({ card, width, back, sx, cardModal, ...props }, ref) => {
  const { showCustomImages } = useContext(DisplayContext);
  const src = back ? cardImageBackUrl(card, showCustomImages) : cardImageUrl(card, showCustomImages);
  const foil = CARD_CATEGORY_DETECTORS.foil(card?.details, card);
  const name = cardName(card);
  const openCardModal = useContext(CardModalContext);
  const handleClick = useCallback(() => openCardModal(card), [openCardModal, card]);
  return (
    <Box sx={{ ...sx, display: 'block', position: 'relative' }}>
      {foil && (
        <Box
          component="img"
          key="foil"
          src="/content/foilOverlay.png"
          sx={{ width, position: 'absolute', pointerEvents: 'none', mixBlendMode: 'color-burn' }}
        />
      )}
      <Box
        onClick={cardModal ? handleClick : null}
        component="img"
        key="cardImage"
        src={src}
        alt={name}
        ref={ref}
        sx={{ width }}
        fallbackSrc="/content/default_card.png"
        {...props}
      />
    </Box>
  );
});
CardImage.propTypes = {
  card: CardPropType.isRequired,
  back: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sx: PropTypes.shape({}),
  cardModal: PropTypes.bool,
};
CardImage.defaultProps = {
  back: false,
  width: '100%',
  sx: {},
  cardModal: false,
};
CardImage.displayName = 'CardImage';
export default CardImage;
