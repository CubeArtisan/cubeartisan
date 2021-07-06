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
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { sortDeep } from '@cubeartisan/client/utils/Sort';

import SortContext from '@cubeartisan/client/components/contexts/SortContext';
import SpoilerImage from '@cubeartisan/client/components/SpoilerImage';
import CardGrid from '@cubeartisan/client/components/CardGrid';

const VisualSpoiler = ({ cards }) => {
  const [scale, setScale] = useState('medium');

  const { primary, secondary, tertiary, quaternary, showOther } = useContext(SortContext);
  const sorted = sortDeep(cards, showOther, quaternary, primary, secondary, tertiary);
  const cardList = sorted
    .map((tuple1) => tuple1[1].map((tuple2) => tuple2[1].map((tuple3) => tuple3[1].map((card) => card))))
    .flat(4);

  let sizes = 'col-4 col-sm-3 col-md-2 col-lg-2 col-xl-1-5';

  if (scale === 'small') {
    sizes = 'col-2 col-sm-2 col-md-1-5 col-lg-1-5 col-xl-1';
  } else if (scale === 'large') {
    sizes = 'col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3';
  }

  return (
    <>
      <Pagination>
        <PaginationItem active={scale === 'small'}>
          <PaginationLink onClick={() => setScale('small')}>Small</PaginationLink>
        </PaginationItem>
        <PaginationItem active={scale === 'medium'}>
          <PaginationLink onClick={() => setScale('medium')}>Medium</PaginationLink>
        </PaginationItem>
        <PaginationItem active={scale === 'large'}>
          <PaginationLink onClick={() => setScale('large')}>Large</PaginationLink>
        </PaginationItem>
      </Pagination>
      <CardGrid cardList={cardList} Tag={SpoilerImage} colProps={{ className: sizes }} />
    </>
  );
};

VisualSpoiler.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
};
export default VisualSpoiler;
