import { useCallback, useContext } from 'react';

import CardModalContext from '@hypercube/client/contexts/CardModalContext';
import FoilCardImage from '@hypercube/client/components/FoilCardImage';
import CardPropType from '@hypercube/client/proptypes/CardPropType';

const SpoilerImage = ({ card }) => {
  const openCardModal = useContext(CardModalContext);
  const handleClick = useCallback(() => openCardModal(card), [openCardModal, card]);
  return <FoilCardImage autocard card={card} onClick={handleClick} className="clickable" />;
};

SpoilerImage.propTypes = {
  card: CardPropType.isRequired,
};

export default SpoilerImage;
