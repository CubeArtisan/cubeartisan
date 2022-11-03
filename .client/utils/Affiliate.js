/*
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

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 */

/**
 * @param {Card} card
 */
export function getTCGLink(card) {
  const { name, isToken } = card.details;
  const tcgplayerId = card.details.tcgplayer_id;
  let tcgplayerLink = 'https://shop.tcgplayer.com/';
  if (tcgplayerId) {
    tcgplayerLink += `product/productsearch?id=${tcgplayerId}`;
  } else {
    const tcgplayerName = isToken ? `${name} Token` : name;
    tcgplayerLink += `productcatalog/product/show?ProductName=${tcgplayerName}`;
  }

  return tcgplayerLink;
}

/**
 * @param {Card} card
 */
export const getCardMarketLink = (card) =>
  `https://www.cardmarket.com/en/Magic/Products/Singles/${card.details.set_name
    .replace(/ /g, '-')
    .replace(/[:,."']/g, '')}/${card.details.name.replace(/ /g, '-').replace(/:/g, '').replace(/\./g, '')}`;

/**
 * @param {Card} card
 */
export const getCardHoarderLink = (card) => `https://www.cardhoarder.com/cards?data%5Bsearch%5D=${card.details.name}`;

/**
 * @param {string} str
 */
export const nameToDashedUrlComponent = (str) =>
  str
    .replace(' - ', '-')
    .replace(/ /g, '-')
    .replace(/[:,."']/g, '')
    .toLowerCase();

/**
 * @param {Card} card
 */
export const getCardKingdomLink = (card) =>
  `https://www.cardkingdom.com/mtg/${nameToDashedUrlComponent(card.details.set_name)}/${nameToDashedUrlComponent(
    card.details.name,
  )}`;

export const tcgMassEntryUrl = 'https://store.tcgplayer.com/massentry?';
