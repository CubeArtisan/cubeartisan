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
const FoilOverlay = (Tag) => (props) => {
  let finish = 'Non-foil';
  if (Object.hasOwnProperty.call(props, 'finish')) {
    finish = props.finish;
  } else if (Object.hasOwnProperty.call(props, 'card') && Object.hasOwnProperty.call(props.card, 'finish')) {
    finish = props.card.finish;
  }
  return (
    <div className="position-relative">
      {finish !== 'Foil' ? (
        ''
      ) : (
        <img src="/content/foilOverlay.png" className="foilOverlay card-border" width="100%" alt="Foil overlay" />
      )}
      <Tag {...props} />
    </div>
  );
};

export default FoilOverlay;
