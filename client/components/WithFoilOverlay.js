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
import PropTypes from 'prop-types';

import { cardFinish } from '@cubeartisan/client/utils/Card';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

const withFoilOverlay = (Tag) => {
  const WithFoilOverlay = ({ card, finish: finishOverride, ...props }) => {
    const finish = finishOverride ?? cardFinish(card) ?? 'Non-foil';
    return (
      <div className="position-relative">
        {finish !== 'Foil' ? (
          ''
        ) : (
          <img src="/content/foilOverlay.png" className="foilOverlay card-border" width="100%" alt="Foil overlay" />
        )}
        <Tag card={card} {...props} />
      </div>
    );
  };
  WithFoilOverlay.propTypes = {
    card: CardPropType.isRequired,
    finish: PropTypes.string,
  };
  WithFoilOverlay.defaultProps = {
    finish: null,
  };
  return WithFoilOverlay;
};
export default withFoilOverlay;
