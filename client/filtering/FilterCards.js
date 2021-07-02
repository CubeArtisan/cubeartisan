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
import { Grammar, Parser } from 'nearley';

import filterCardGrammar from '@cubeartisan/client/generated/filtering/cardFilters';

const compiledGrammar = Grammar.fromCompiled(filterCardGrammar);

const ALL_OPERATORS = [':', '=', '!=', '<>', '<', '<=', '>', '>='];

export const operatorsRegex = new RegExp(`(?:${ALL_OPERATORS.join('|')})`);

export const filterUses = (filter, name) => (filter?.fieldsUsed?.indexOf?.(name) ?? -1) >= 0;

export const filterUsedFields = (filter) => filter?.fieldsUsed ?? [];

export const filterToString = (filter) => filter?.stringify ?? 'empty filter';

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

export const filterCardsDetails = (cards, filter) => (filter ? cards.filter((details) => filter({ details })) : cards);

export default {
  operators: ALL_OPERATORS,
  operatorsRegex,
  filterUses,
  filterUsedFields,
  filterToString,
  makeFilter,
  filterCardsDetails,
};
