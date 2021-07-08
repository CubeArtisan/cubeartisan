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
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard';

const AutocardLi = withAutocard('li');

// Deepmerge utility
const isMergeableObject = (val) => {
  const nonNullObject = val && typeof val === 'object';

  return (
    nonNullObject &&
    Object.prototype.toString.call(val) !== '[object RegExp]' &&
    Object.prototype.toString.call(val) !== '[object Date]'
  );
};

const emptyTarget = (val) => (Array.isArray(val) ? [] : {});

let cloneIfNecessary;
let defaultArrayMerge;
let mergeObject;

const deepmerge = (target, source, optionsArgument) => {
  const array = Array.isArray(source);
  const options = optionsArgument || {
    arrayMerge: defaultArrayMerge,
  };
  const arrayMerge = options.arrayMerge || defaultArrayMerge;

  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument);
  }
  return mergeObject(target, source, optionsArgument);
};

const deepmergeAll = (array, optionsArgument) => {
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error('first argument should be an array with at least two elements');
  }

  // we are sure there are at least 2 values, so it is safe to have no initial value
  return array.reduce((prev, next) => deepmerge(prev, next, optionsArgument));
};
deepmerge.all = deepmergeAll;

cloneIfNecessary = (value, optionsArgument) => {
  const clone = optionsArgument && optionsArgument.clone === true;
  return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
};

defaultArrayMerge = (target, source, optionsArgument) => {
  const destination = target.slice();
  source.forEach((e, i) => {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument);
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument);
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument));
    }
  });
  return destination;
};

mergeObject = (target, source, optionsArgument) => {
  const destination = {};
  if (isMergeableObject(target)) {
    Object.keys(target).forEach((key) => {
      destination[key] = cloneIfNecessary(target[key], optionsArgument);
    });
  }
  Object.keys(source).forEach((key) => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument);
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument);
    }
  });
  return destination;
};

const isEmpty = (obj) => {
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

const getPosts = (names, current) => {
  if (current === '') {
    return names;
  }
  const character = current.charAt(0);
  const sub = current.substr(1, current.length);

  // please don't try to understand why this works
  if (
    character.toUpperCase() !== character.toLowerCase() &&
    names[character.toUpperCase()] &&
    names[character.toLowerCase()]
  ) {
    if (names[character.toUpperCase()][sub.charAt(0)]) {
      const upper = getPosts(names[character.toUpperCase()], sub);
      if (names[character.toLowerCase()]) {
        const lower = getPosts(names[character.toLowerCase()], sub);
        return deepmerge(upper, lower);
      }
      return upper;
    }
    const lower = getPosts(names[character.toLowerCase()], sub);
    if (names[character.toUpperCase()]) {
      const upper = getPosts(names[character.toUpperCase()], sub);
      return deepmerge(upper, lower);
    }
    return lower;
  }
  if (names[character.toUpperCase()]) {
    return getPosts(names[character.toUpperCase()], sub);
  }
  if (names[character.toLowerCase()]) {
    return getPosts(names[character.toLowerCase()], sub);
  }
  return {};
};

const treeToWords = (tree, max) => {
  if (isEmpty(tree)) {
    return [];
  }
  const words = [];
  // eslint-disable-next-line guard-for-in
  for (const prop in tree) {
    // eslint-disable-next-line no-prototype-builtins
    if (tree.hasOwnProperty(prop)) {
      if (isEmpty(tree[prop])) {
        words.push(prop);
      }
      const wordlets = treeToWords(tree[prop], max);
      for (let i = 0; i < wordlets.length; i++) {
        words.push(prop + wordlets[i]);
      }
    }
    if (words.length > max) {
      return words;
    }
  }
  return words;
};

const getAllMatches = (names, current) => {
  const posts = getPosts(names, current);
  const words = treeToWords(posts, 10).slice(0, 10);

  for (let i = 0; i < words.length; i++) {
    words[i] = current + words[i];
    words[i] = words[i].substr(0, words[i].length - 1);
  }
  return words;
};

// Map URL => Promise returning tree
export const treeCache = {};

const fetchTree = async (treeUrl, treePath) => {
  const response = await fetch(treeUrl);
  if (!response.ok) {
    console.error(`Failed to fetch autocomplete tree: ${response.statusCode}`);
    return null;
  }
  const json = await response.json();
  if (json.success !== 'true') {
    console.error('Error getting autocomplete tree.');
    return null;
  }

  return json[treePath];
};

const AutocompleteInput = forwardRef(
  ({ treeUrl, treePath, defaultValue, value, onChange, onSubmit, wrapperClassName, cubeId, name, ...props }, ref) => {
    const [tree, setTree] = useState({});
    const [position, setPosition] = useState(-1);
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue || '');
    const realValue = value ?? inputValue;
    props.name = name;

    useEffect(() => {
      (async () => {
        try {
          if (!treeCache[treeUrl]) {
            treeCache[treeUrl] = fetchTree(treeUrl, treePath);
          }
          setTree(await treeCache[treeUrl]);
        } catch (e) {
          console.error('Error getting autocomplete tree.', e);
        }
      })();
    }, [treePath, treeUrl]);

    const handleChange = useCallback(
      (event) => {
        setInputValue(event.target.value);
        setVisible(true);
        // eslint-disable-next-line no-unused-expressions
        onChange?.(event);
      },
      [onChange],
    );

    const acceptSuggestion = useCallback(
      (newValue) => {
        const target = {
          name,
          value: newValue,
        };
        setInputValue(newValue);
        setVisible(false);
        setPosition(-1);
        // eslint-disable-next-line no-unused-expressions
        onChange?.({
          target,
          currentTarget: target,
        });
      },
      [onChange, name],
    );

    const handleClickSuggestion = useCallback(
      (event) => {
        event.preventDefault();
        acceptSuggestion(event.target.textContent);
      },
      [acceptSuggestion],
    );

    // Replace curly quotes with straight quotes. Needed for iOS.
    const normalizedValue = realValue.replace(/[\u2018\u2019\u201C\u201D]/g, (c) =>
      '\'\'""'.substr('\u2018\u2019\u201C\u201D'.indexOf(c), 1),
    );
    const matches = useMemo(() => getAllMatches(tree, normalizedValue), [tree, normalizedValue]);
    const showMatches =
      visible && realValue && matches.length > 0 && !(matches.length === 1 && matches[0] === realValue);

    const handleKeyDown = useCallback(
      (event) => {
        if (event.keyCode === 40) {
          // DOWN key
          event.preventDefault();
          setPosition((oldPosition) => (oldPosition < 9 ? oldPosition + 1 : oldPosition));
        } else if (event.keyCode === 38) {
          // UP key
          event.preventDefault();
          setPosition((oldPosition) => (oldPosition > -1 ? oldPosition - 1 : oldPosition));
        } else if (event.keyCode === 9 || event.keyCode === 13) {
          // TAB or ENTER key
          if (showMatches) {
            const goodPosition = position >= 0 && position < matches.length ? position : 0;
            const match = matches[goodPosition];
            acceptSuggestion(match);
            if (event.keyCode === 13 && onSubmit) {
              // ENTER key
              onSubmit(event, match);
            }
          }
        }
      },
      [position, acceptSuggestion, matches, showMatches, onSubmit],
    );

    return (
      <div className={wrapperClassName}>
        <Input ref={ref} value={realValue} onKeyDown={handleKeyDown} onChange={handleChange} {...props} />
        {showMatches && (
          <ul className="autocomplete-list">
            {matches.map((match, index) => (
              <AutocardLi
                inModal
                front={cubeId ? `/cube/${cubeId}/${match}/image` : `/card/${match}/image`}
                key={index /* eslint-disable-line react/no-array-index-key */}
                onClick={handleClickSuggestion}
                className={index === position ? 'active' : undefined}
              >
                {match}
              </AutocardLi>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
AutocompleteInput.propTypes = {
  treeUrl: PropTypes.string.isRequired,
  treePath: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
  cubeId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
AutocompleteInput.defaultProps = {
  defaultValue: null,
  value: null,
};
export default AutocompleteInput;
