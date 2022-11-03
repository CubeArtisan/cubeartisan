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
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CardBody, Input, Modal, ModalBody, ModalFooter, ModalHeader, Navbar } from 'reactstrap';

import NumericField from '@cubeartisan/client/components/inputs/NumericField.js';
import SelectField from '@cubeartisan/client/components/inputs/SelectField.js';

const AdvancedSearchModal = ({ isOpen, toggle }) => {
  const [keyword, setKeyword] = useState('');
  const [owner, setOwner] = useState('');
  const [tag, setTag] = useState('');
  const [decks, setDecks] = useState('');
  const [cards, setCards] = useState('');
  const [include, setInclude] = useState('');
  const [category, setCategory] = useState('');

  const [decksOp, setDecksOp] = useState('=');
  const [cardsOp, setCardsOp] = useState('=');

  const Categories = [
    '',
    'Vintage',
    'Legacy+',
    'Legacy',
    'Modern',
    'Pioneer',
    'Historic',
    'Standard',
    'Set',
    'Powered',
    'Unpowered',
    'Pauper',
    'Peasant',
    'Budget',
    'Silver-bordered',
    'Commander',
    'Judge Tower',
    'Multiplayer',
    'Battle Box',
  ];
  const handleChange = (event) => {
    const { target } = event;
    const value = ['checkbox', 'radio'].includes(target.type) ? target.checked : target.value;
    const key = target.name;

    switch (key) {
      case 'keyword':
        setKeyword(value);
        break;
      case 'owner':
        setOwner(value);
        break;
      case 'tag':
        setTag(value);
        break;
      case 'decks':
        setDecks(value);
        break;
      case 'cards':
        setCards(value);
        break;
      case 'decksOp':
        setDecksOp(value);
        break;
      case 'cardsOp':
        setCardsOp(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'include':
        setInclude(value);
        break;
      default:
        break;
    }
  };

  const submit = () => {
    let queryText = '';

    if (keyword.length > 0) {
      queryText += `"${keyword}" `;
    }
    if (owner.length > 0) {
      queryText += `owner:"${owner}" `;
    }
    if (tag.length > 0) {
      queryText += `tag:"${tag}" `;
    }
    if (decks.length > 0) {
      queryText += `decks${decksOp}${decks} `;
    }
    if (cards.length > 0) {
      queryText += `cards${cardsOp}${cards} `;
    }
    if (category.length > 0) {
      queryText += `category:"${category}" `;
    }
    if (include.length > 0) {
      queryText += `card:"${include}" `;
    }

    if (queryText.length > 0) {
      window.location.href = `/cubes/search/${encodeURIComponent(queryText.trim())}/0`;
    } else {
      window.location.href = '/cubes/search';
    }
  };

  return (
    <>
      <Button color="success" onClick={toggle}>
        Advanced...
      </Button>
      <Modal size="lg" isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Advanced Search</ModalHeader>
        <ModalBody>
          <TextField
            name="keyword"
            label="Keywords"
            placeholder={'Any text in the name or tags, e.g. "Innistrad"'}
            value={keyword}
            onChange={handleChange}
          />
          <TextField
            name="owner"
            label="Owner Name"
            placeholder={'Any text in the owner name, e.g. "TimFReilly"'}
            value={owner}
            onChange={handleChange}
          />
          <TextField
            name="tag"
            label="Cube Tags"
            placeholder={'Any tag on a cube, e.g. "2 player"'}
            value={tag}
            onChange={handleChange}
          />
          <NumericField
            name="decks"
            humanName="Number of Decks"
            placeholder={'Any value, e.g. "2"'}
            value={decks}
            valueOp={decksOp}
            onChange={handleChange}
          />
          <NumericField
            name="cards"
            humanName="Number of Cards"
            placeholder={'Any value, e.g. "360"'}
            value={cards}
            valueOp={cardsOp}
            onChange={handleChange}
          />
          <SelectField
            name="category"
            humanName="Cube Category"
            value={category}
            onChange={handleChange}
            options={Categories}
          />
          {/* TODO: use autocomplete here */}
          <TextField
            name="include"
            label="Cubes that include the card:"
            placeholder={'Any full card name, e.g. "Ambush Viper"'}
            value={include}
            onChange={handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={submit}>
            Search
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
AdvancedSearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const CubeSearchNavBar = ({ query, order, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [queryText, setQuery] = useState(query || '');
  const toggle = () => setIsOpen((open) => !open);
  const [searchOrder, setSearchIndex] = useState(order || 'date');

  const searchOptions = [
    ['Date Updated', 'date'],
    ['Alphabetical', 'alpha'],
    ['Popularity', 'pop'],
  ];

  const handleChangeSearch = (event) => {
    setSearchIndex(event.target.value);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (queryText && queryText.length > 0) {
      window.location.href = `/cubes/search/${queryText}/0?order=${searchOrder}`;
    } else {
      window.location.href = `/cubes/search`;
    }
  };

  return (
    <div className="usercontrols">
      {title && (
        <CardBody className="pb-0">
          <h3>{title}</h3>
        </CardBody>
      )}
      <form onSubmit={handleSubmit}>
        <Navbar expand="md" className="navbar-light">
          <Input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Cubes..."
            aria-label="Search"
            value={queryText}
            onChange={handleChange}
          />
          <h6 className="noBreak mr-2 pt-2">Sorted by:</h6>
          <Input type="select" id="viewSelect" value={searchOrder} onChange={handleChangeSearch}>
            {searchOptions.map((search) => (
              <option key={search[1]} value={search[1]}>
                {search[0]}
              </option>
            ))}
          </Input>
          <Button color="success" className="mx-2">
            Search
          </Button>
          <AdvancedSearchModal isOpen={isOpen} toggle={toggle} setQuery={setQuery} />
        </Navbar>
      </form>
    </div>
  );
};

CubeSearchNavBar.propTypes = {
  query: PropTypes.string,
  order: PropTypes.string,
  title: PropTypes.string,
};

CubeSearchNavBar.defaultProps = {
  title: null,
  query: '',
  order: 'date',
};

export default CubeSearchNavBar;
