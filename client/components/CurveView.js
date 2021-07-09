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

import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';

import { getLabels, sortDeep } from '@cubeartisan/client/utils/Sort.js';
import { fromEntries } from '@cubeartisan/client/utils/Util.js';

import AutocardListGroup from '@cubeartisan/client/components/AutocardListGroup.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';

const cmc2Labels = getLabels(null, 'Mana Value 2');

const TypeRow = ({ cardType, group }) => {
  const sorted = fromEntries(sortDeep(group, false, 'Alphabetical', 'Mana Value 2'));
  return (
    <>
      <h6>
        {cardType} ({group.length})
      </h6>
      <Row className="row-low-padding mb-2">
        {cmc2Labels.map((cmc) => (
          <div key={cmc} className="col-low-padding" style={{ width: `${100 / cmc2Labels.length}%` }}>
            <AutocardListGroup
              heading={`${cmc} (${(sorted[cmc] || []).length})`}
              cards={sorted[cmc] || []}
              sort="Unsorted"
            />
          </div>
        ))}
      </Row>
    </>
  );
};

TypeRow.propTypes = {
  cardType: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const ColorCard = ({ color, group }) => (
  <Card className="mb-3">
    <CardHeader>
      <h5 className="mb-0">
        {color} {group.length}
      </h5>
    </CardHeader>
    <CardBody>
      {sortDeep(group, false, 'Alphabetical', 'Creature/Non-Creature').map(([label, cncGroup]) => (
        <TypeRow key={label} cardType={label} group={cncGroup} />
      ))}
    </CardBody>
  </Card>
);

ColorCard.propTypes = {
  color: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const CurveView = ({ cards, ...props }) => {
  const { primary, showOther } = useContext(SortContext);

  // We call the groups color and type even though they might be other sorts.
  return (
    <Row {...props}>
      <Col>
        {sortDeep(cards, showOther, 'Alphabetical', primary).map(([color, group]) => (
          <ColorCard key={color} color={color} group={group} />
        ))}
      </Col>
    </Row>
  );
};

CurveView.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CurveView;
