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
import { useContext } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

import { Row, Col } from 'reactstrap';

import { countGroup, sortDeep } from '@cubeartisan/client/utils/Sort';

import AutocardListGroup from '@cubeartisan/client/components/AutocardListGroup';
import AutocardListItem from '@cubeartisan/client/components/AutocardListItem';
import DisplayContext from '@cubeartisan/client/contexts/DisplayContext';
import SortContext from '@cubeartisan/client/contexts/SortContext';

const TableView = ({ cards, rowTag, noGroupModal, className, ...props }) => {
  const { primary, secondary, tertiary, quaternary, showOther } = useContext(SortContext);
  const { compressedView } = useContext(DisplayContext);

  const sorted = sortDeep(cards, showOther, quaternary, primary, secondary);

  return (
    <div className={`table-view-container${className ? ` ${className}` : ''}`}>
      <Row className={`table-view${compressedView ? ' compressed' : ''}`} {...props}>
        {sorted.map(([columnLabel, column]) => (
          <Col
            key={columnLabel}
            md={compressedView ? undefined : 'auto'}
            className="table-col"
            style={{
              width: `${100 / Math.min(sorted.length, 9)}%`,
              flexBasis: compressedView ? `${100 / Math.min(sorted.length, 9)}%` : undefined,
            }}
          >
            <h6 className="text-center card-list-heading">
              {columnLabel}
              <br />({countGroup(column)})
            </h6>
            {column.map(([label, row]) => (
              <AutocardListGroup
                key={label}
                heading={`${label} (${countGroup(row)})`}
                cards={row}
                rowTag={rowTag}
                noGroupModal={noGroupModal}
                sort={tertiary}
                orderedSort={quaternary}
                showOther={showOther}
              />
            ))}
          </Col>
        ))}
      </Row>
    </div>
  );
};

TableView.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  rowTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  noGroupModal: PropTypes.bool,
  className: PropTypes.string,
};

TableView.defaultProps = {
  rowTag: AutocardListItem,
  noGroupModal: false,
  className: null,
};

export default TableView;
