import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, MenuItem, Select } from '@mui/material';

const LabeledSelect = ({ label, baseId, values, value, setValue, labelSx, selectSx }) => (
  <>
    <InputLabel id={`${baseId}-label`} sx={labelSx}>
      {label}
    </InputLabel>
    <Select
      labelId={`${baseId}-label`}
      id={`${baseId}-select`}
      value={value}
      label={label}
      onChange={(event) => setValue(event.target.value)}
      sx={selectSx}
    >
      {values.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </>
);
LabeledSelect.propTypes = {
  label: PropTypes.string.isRequired,
  baseId: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  labelSx: PropTypes.shape({}),
  selectSx: PropTypes.shape({}),
};
LabeledSelect.defaultProps = {
  value: null,
  labelSx: {},
  selectSx: { marginY: 1 },
};
export default LabeledSelect;
