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
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import TagContext from '@cubeartisan/client/components/contexts/TagContext.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import useCardNames from '@cubeartisan/client/hooks/UseCardNames.js';
import { KMPSearch, makeKMPTable } from '@cubeartisan/client/utils/KMPSearch.js';

/**
 * @param {string} string
 * @returns {string} result
 */
const stripDiacritics = (string) =>
  typeof string.normalize !== 'undefined' ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : string;

const MAX_RESULTS = 12;

const normalize = (input) => stripDiacritics(input.trim().toLowerCase());

const TextOption = forwardRef(({ children, selected, sx, ...props }, ref) => (
  <Typography
    {...props}
    component="li"
    variant="body1"
    noWrap
    sx={{ backgroundColor: selected ? 'background.hover' : null, width: '100%', ...sx }}
    ref={ref}
  >
    {children}
  </Typography>
));
TextOption.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  sx: PropTypes.shape({}),
};
TextOption.defaultProps = {
  selected: false,
  sx: {},
};
const AutocardTextOption = withAutocard(TextOption);

const TagChip = ({ tag, sx, ...props }) => {
  const { tagColorClass } = useContext(TagContext);
  sx.backgroundColor = tagColorClass(tag);
  return <Chip label={tag} {...props} sx={sx} />;
};
TagChip.propTypes = {
  tag: PropTypes.string.isRequired,
  sx: PropTypes.shape({ backgroundColor: PropTypes.string }),
};
TagChip.defaultProps = {
  sx: {},
};

/**
 * @param {Array<string>} value
 * @param {(x: { index: number }) => object} getTagProps
 */
const renderTags = (value, getTagProps) =>
  value.map((option, index) => {
    const props = getTagProps({ index });
    return <TagChip key={option?.id} tag={option?.text} {...props} />;
  });

/**
 * @param {object} props
 */
const renderInput = (props) => <TextField {...props} variant="outlined" />;

/**
 * @param {import('react').HTMLAttributes<HTMLLIElement>} props
 * @param {{ name: string, cubeId?: string }} card
 * @param {import('@mui/material').AutocompleteRenderOptionState} _
 * @returns {import('react').ReactNode} option
 */
const renderCardOption = (props, { name, cubeId }, { selected }) => (
  <AutocardTextOption
    {...props}
    key={name}
    front={cubeId ? `/cube/${cubeId}/${name}/image` : `/card/${name}/image/redirect`}
    selected={selected}
  >
    {name}
  </AutocardTextOption>
);

/**
 * @param {import('react').HTMLAttributes<HTMLLIElement>} props
 * @param {string} text
 * @param {import('@mui/material').AutocompleteRenderOptionState} _
 * @returns {import('react').ReactNode} option
 */
const renderTextOption = (props, text, { selected }) => (
  <TextOption {...props} key={text} selected={selected}>
    {text}
  </TextOption>
);

/**
 * @param {import('react').HTMLAttributes<HTMLLIElement>} props
 * @param {{ text: string, id: string}} tag
 * @param {import('@mui/material').AutocompleteRenderOptionState} _
 * @returns {import('react').ReactNode} option
 */
const renderTagOption = (props, tag, { selected }) => (
  <TextOption {...props} key={tag?.id} selected={selected}>
    {tag?.text}
  </TextOption>
);

export const AutocompleteTextField = ({
  options,
  renderOption,
  InputProps,
  loading,
  getOptionLabel,
  onInputChange,
  submitButtonProps,
  onSubmit,
  inputValueToValue,
  submitButtonText,
  noButton,
  disabled,
  onRemove,
  onCreate,
  ...props
}) => {
  const [optionsCache, setOptionsCache] = useState([]);
  useEffect(() => {
    (async () =>
      setOptionsCache(options.map((option) => ({ option, normalized: normalize(getOptionLabel(option)) }))))();
  }, [options, getOptionLabel]);
  const [filtering, setFiltering] = useState(true);
  const [filteredOptions, setFilteredOptions] = useState(options.slice(0, MAX_RESULTS));
  const lastInput = useRef('');
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (inputValue === '') {
      setFilteredOptions(options.slice(0, MAX_RESULTS));
      setFiltering(false);
      return;
    }
    setFiltering(true);
    (async () => {
      lastInput.current = inputValue;
      const normalizedInput = normalize(inputValue);
      const table = makeKMPTable(normalizedInput);
      const results = [];
      let i = 0;
      for (const { option, normalized } of optionsCache) {
        if (i % 100 === 99) {
          if (lastInput.current !== inputValue) return;
        }
        if (KMPSearch(normalized, normalizedInput, table) > -1) {
          results.push(option);
          if (results.length >= MAX_RESULTS) break;
        }
        i += 1;
      }
      if (lastInput.current === inputValue) {
        setFilteredOptions(results);
        setFiltering(false);
      }
    })();
  }, [optionsCache, inputValue, options]);
  const handleInputChange = useCallback(
    (event, newValue) => {
      onInputChange(event, newValue);
      lastInput.current = newValue;
      setInputValue(newValue);
    },
    [onInputChange],
  );

  const handleChange = useCallback(
    (_, value, action) => {
      if (action === 'selectOption') {
        onSubmit(value);
      } else if (action === 'removeOption') {
        onRemove(value);
      } else if (action === 'createOption') {
        onCreate(value);
      }
    },
    [onSubmit, onRemove, onCreate],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '1rem',
        border: '1px solid',
        backgroundColor: 'background.paper',
      }}
    >
      <Autocomplete
        options={filtering ? [] : filteredOptions}
        renderInput={(config) => renderInput({ ...InputProps, ...config })}
        renderOption={renderOption}
        renderTags={renderTags}
        loading={loading || filtering}
        getOptionLabel={getOptionLabel}
        filterOptions={(x) => x}
        onChange={handleChange}
        onInputChange={handleInputChange}
        value={inputValueToValue(inputValue)}
        disabled={disabled}
        {...props}
      />
      {!noButton && (
        <LoadingButton disabled={disabled || inputValue.length === 0} {...submitButtonProps}>
          {submitButtonText}
        </LoadingButton>
      )}
    </Box>
  );
};
AutocompleteTextField.propTypes = {
  // eslint-disable-next-line
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderOption: PropTypes.func,
  InputProps: PropTypes.shape({}),
  loading: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  onInputChange: PropTypes.func,
  inputValueToValue: PropTypes.func,
  submitButtonText: PropTypes.string,
  submitButtonProps: PropTypes.shape({}),
  noButton: PropTypes.bool,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  onCreate: PropTypes.func,
};
AutocompleteTextField.defaultProps = {
  renderOption: renderTextOption,
  InputProps: {},
  loading: false,
  getOptionLabel: (x) => x,
  onInputChange: () => {},
  inputValueToValue: (x) => x,
  submitButtonText: 'Submit',
  submitButtonProps: {},
  noButton: false,
  onSubmit: () => {},
  disabled: false,
  onRemove: () => {},
  onCreate: () => {},
};

export const AutocompleteCardField = ({ fullNames, cubeID, sx, ...props }) => {
  const { names, loading } = useCardNames({ cubeID, fullNames });
  const options = useMemo(() => {
    if (loading || !Array.isArray(names)) return [];
    return names.map((name) => ({ name, cubeID }));
  }, [names, cubeID, loading]);
  return (
    <AutocompleteTextField
      options={options}
      renderOption={renderCardOption}
      getOptionLabel={(obj) => obj?.name ?? obj}
      isOptionEqualToValue={(obj1, obj2) => obj1?.name === obj2?.name}
      sx={{ width: '24rem', ...sx }}
      loading={loading}
      inputValueToValue={(name) => ({ name, cubeID: null })}
      {...props}
    />
  );
};
AutocompleteCardField.propTypes = {
  cubeID: PropTypes.string,
  fullNames: PropTypes.bool,
  sx: PropTypes.shape({}),
};
AutocompleteCardField.defaultProps = {
  cubeID: null,
  fullNames: false,
  sx: {},
};

const actualTags = (values) => values.map((text) => ({ text, id: text }));
export const AutocompleteTagField = ({ updateTags, tags, onSubmit, onRemove, onCreate, ...props }) => {
  const { allSuggestions } = useContext(TagContext);
  const submitHandler = useMemo(() => {
    if (onSubmit) return (values) => onSubmit(actualTags(values));
    return (values) => updateTags(actualTags(values));
  }, [updateTags, onSubmit]);
  const removeHandler = useMemo(() => {
    if (!tags) return null;
    if (onRemove) return (values) => onRemove(actualTags(values));
    return (values) => updateTags(actualTags(values));
  }, [tags, updateTags, onRemove]);
  const createHandler = useMemo(() => {
    if (!tags) return null;
    if (onCreate) return (values) => onCreate(actualTags(values));
    return (values) => updateTags(actualTags(values));
  }, [tags, updateTags, onCreate]);
  return (
    <AutocompleteTextField
      options={allSuggestions ?? []}
      renderOption={renderTagOption}
      sx={{ width: '100%' }}
      InputProps={{ placeholder: 'Tag (hit tab)...', maxLength: 24 }}
      getOptionLabel={(obj) => obj?.text}
      isOptionEqualToValue={(obj1, obj2) => obj1?.text === obj2?.text}
      noButton
      onSubmit={submitHandler}
      onRemove={removeHandler}
      onCreate={createHandler}
      value={tags}
      filterSelectedOptions
      includeInputInList
      {...props}
    />
  );
};
AutocompleteTagField.propTypes = {
  updateTags: PropTypes.func,
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onCreate: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, id: PropTypes.string })),
};
AutocompleteTagField.defaultProps = {
  updateTags: () => {},
  tags: undefined,
  onSubmit: null,
  onRemove: null,
  onCreate: null,
};
