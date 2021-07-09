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
import CubePreview from '@cubeartisan/client/components/CubePreview.js';
import InfiniteCarousel from 'react-leaf-carousel';
import PropTypes from 'prop-types';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';

const CubeCarousel = ({ cubes }) => {
  return (
    <InfiniteCarousel
      breakpoints={[
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ]}
      showSides
      sidesOpacity={1}
      sideSize={0.4}
      slidesToScroll={4}
      slidesToShow={4}
      slidesSpacing={0}
    >
      {cubes.map((cube) => (
        <CubePreview key={cube._id} cube={cube} />
      ))}
    </InfiniteCarousel>
  );
};

CubeCarousel.propTypes = {
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
};

export default CubeCarousel;
