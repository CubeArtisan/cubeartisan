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
import nearley from 'nearley';

import filterCardGrammar from '@cubeartisan/client/generated/filtering/cardFilters.js';
import { detailsToCard } from '@cubeartisan/client/utils/Card.js';

const { Grammar, Parser } = nearley;

const compiledGrammar = Grammar.fromCompiled(filterCardGrammar);

const ALL_OPERATORS = [':', '=', '!=', '<>', '<', '<=', '>', '>='];

export const operatorsRegex = new RegExp(`(?:${ALL_OPERATORS.join('|')})`);

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} CardDetails
 */

/**
 * @typedef {{(card: Card): boolean, stringify: string, fieldsUsed: string[]}} Filter
 */

/**
 * @param {Filter} filter
 * @param {string} name
 */
export const filterUses = (filter, name) => (filter?.fieldsUsed?.indexOf?.(name) ?? -1) >= 0;

/**
 * @param {Filter} filter
 */
export const filterUsedFields = (filter) => filter?.fieldsUsed ?? [];

/**
 * @param {Filter} filter
 */
export const filterToString = (filter) => filter?.stringify ?? 'empty filter';

/**
 * @param {string?} filterText
 * @returns {{ err: any, filter: Filter? }} filterOrErr
 */
export function makeFilter(filterText) {
  if (!filterText || filterText.trim() === '') {
    return {
      err: false,
      filter: null,
    };
  }

  const filterParser = new Parser(compiledGrammar);
  try {
    filterParser.feed(filterText);
  } catch (err) {
    return { err, filter: null };
  }
  const { results } = filterParser;
  if (results.length === 1) {
    const [filter] = results;
    filter.stringify = filterText;
    return {
      err: !filter,
      filter,
    };
  }

  return {
    err: results,
    filter: null,
  };
}

/**
 * @param {CardDetails[]} cards
 * @param {Filter?} filter
 */
export const filterCardsDetails = (cards, filter) =>
  filter ? cards.filter((details) => filter(detailsToCard(details))) : cards;

export default {
  operators: ALL_OPERATORS,
  operatorsRegex,
  filterUses,
  filterUsedFields,
  filterToString,
  makeFilter,
  filterCardsDetails,
};
