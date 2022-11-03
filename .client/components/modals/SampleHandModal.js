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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, NavLink } from 'reactstrap';

import CardImage from '@cubeartisan/client/components/CardImage.js';
import CardGrid from '@cubeartisan/client/components/containers/CardGrid.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import { arrayShuffle } from '@cubeartisan/client/utils/Util.js';

const AutocardImage = withAutocard(CardImage);

class SampleHandModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      hand: [],
      pool: [],
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.refresh = this.refresh.bind(this);
    this.draw = this.draw.bind(this);
  }

  refresh() {
    const { deck } = this.props;

    const pool = [];
    for (const row of deck) {
      for (const col of row) {
        for (const card of col) {
          if (card) pool.push(card);
        }
      }
    }

    arrayShuffle(pool);
    const hand = pool.splice(0, Math.min(7, pool.length));

    this.setState({
      hand,
      pool,
    });
  }

  draw() {
    const { hand, pool } = this.state;
    const newPool = Array.from(pool);
    if (newPool.length > 0) {
      hand.push(newPool.splice(0, 1)[0]);

      this.setState({
        hand,
        pool: newPool,
      });
    }
  }

  open(event) {
    event.preventDefault();
    this.refresh();
    this.setState({
      isOpen: true,
    });
  }

  close() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { isOpen, hand } = this.state;

    return (
      <>
        <NavLink className="nav-link" href="#" onClick={this.open}>
          Sample Hand
        </NavLink>

        <Modal size="xl" isOpen={isOpen} toggle={this.close} centered>
          <ModalHeader toggle={this.close}>Sample Hand</ModalHeader>
          <ModalBody className="p-4">
            <CardGrid
              cardList={hand}
              Tag={AutocardImage}
              colProps={{ xs: 4 }}
              cardProps={{ 'data-in-modal': true }}
              linkDetails
            />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.refresh}>
              New Hand
            </Button>
            <Button color="success" onClick={this.draw}>
              Draw One Card
            </Button>
            <Button color="secondary" onClick={this.close}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

SampleHandModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  deck: PropTypes.array.isRequired,
};

export default SampleHandModal;
