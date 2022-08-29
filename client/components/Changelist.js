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
import { addCardMarkdown, removeCardMarkdown, replaceCardMarkdown } from '@cubeartisan/markdown';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useContext } from 'react';

import ChangelistContext from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { cardName } from '@cubeartisan/client/utils/Card.js';

const TextAutocard = withAutocard(Typography);

const CloseButton = ({ changeId, close }) => (
  <Button variant="contained" data-change-id={changeId} onClick={close} sx={{ marginRight: 1 }}>
    ×
  </Button>
);
CloseButton.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

const Add = ({ card, changeId, close }) => (
  <Box component="li" sx={{ display: 'flex' }}>
    <CloseButton changeId={changeId} close={close} />
    <Markdown markdown={addCardMarkdown({ name: cardName(card) ?? '', cardID: card.cardID })} />
  </Box>
);
Add.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  card: CardPropType.isRequired,
};

const Remove = ({ card, changeId, close }) => (
  <li>
    <CloseButton changeId={changeId} close={close} />
    <Markdown markdown={removeCardMarkdown({ name: cardName(card) ?? '', cardID: card.cardID })} />
    <TextAutocard card={card}>{cardName(card)}</TextAutocard>
  </li>
);
Remove.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  card: CardPropType.isRequired,
};

const Replace = ({ cards, changeId, close }) => (
  <li>
    <CloseButton changeId={changeId} close={close} />
    <Markdown
      markdown={replaceCardMarkdown(
        { name: cardName(cards[0]) ?? '', cardID: cards[0].cardID },
        { name: cardName(cards[1]) ?? '', cardID: cards[1].cardID },
      )}
    />
  </li>
);
Replace.propTypes = {
  changeId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
};

const getId = (card) => card.details._id || card.cardID;
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
      <input type="hidden" name="body" value={changelistData} />
    </>
  );
};
export default Changelist;
