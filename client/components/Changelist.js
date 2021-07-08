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
import { useCallback, useContext } from 'react';
import { Badge, Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import ChangelistContext from '@cubeartisan/client/components/contexts/ChangelistContext';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

const TextAutocard = withAutocard('span');

const CloseButton = ({ changeId, close }) => (
  <Button href="#" className="clickx" data-change-id={changeId} onClick={close}>
    ×
  </Button>
);
CloseButton.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

const Add = ({ card, changeId, close }) => (
  <li>
    <CloseButton changeId={changeId} close={close} /> <Badge color="success">+</Badge>{' '}
    <TextAutocard card={card}>{card.details.name}</TextAutocard>
  </li>
);
Add.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  card: CardPropType.isRequired,
};

const Remove = ({ card, changeId, close }) => (
  <li>
    <CloseButton changeId={changeId} close={close} /> <Badge color="danger">-</Badge>{' '}
    <TextAutocard card={card}>{card.details.name}</TextAutocard>
  </li>
);
Remove.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  card: CardPropType.isRequired,
};

const Replace = ({ cards, changeId, close }) => (
  <li>
    <CloseButton changeId={changeId} close={close} /> <Badge color="primary">→</Badge>{' '}
    <TextAutocard card={cards[0]}>{cards[0].details.name}</TextAutocard>
    {' > '}
    <TextAutocard card={cards[1]}>{cards[1].details.name}</TextAutocard>
  </li>
);
Replace.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
};

const Changelist = () => {
  const { changes, removeChange } = useContext(ChangelistContext);
  const close = useCallback(
    (event) => {
      event.preventDefault();

      const { target } = event;
      const changeId = parseInt(target.getAttribute('data-change-id'), 10);
      removeChange(changeId);
    },
    [removeChange],
  );

  const getId = (card) => card.details._id || card.cardID;

  const changelistData = changes
    .map((change) => {
      if (change.add) {
        return `+${change.add.details._id || change.add.cardID}`;
      }
      if (change.remove) {
        return `-${change.remove.index}$${getId(change.remove)}`;
      }
      if (change.replace) {
        return `/${`${change.replace[0].index}$${getId(change.replace[0])}`}>${getId(change.replace[1])}`;
      }
      return null;
    })
    .join(';');

  return (
    <>
      <ul className="changelist">
        {changes.map((change) => {
          if (change.add) {
            return <Add key={change.id} card={change.add} changeId={change.id} close={close} />;
          }
          if (change.remove) {
            return <Remove key={change.id} card={change.remove} changeId={change.id} close={close} />;
          }
          if (change.replace) {
            return <Replace key={change.id} cards={change.replace} changeId={change.id} close={close} />;
          }
          return null;
        })}
      </ul>
      <Input type="hidden" name="body" value={changelistData} />
    </>
  );
};

export default Changelist;
