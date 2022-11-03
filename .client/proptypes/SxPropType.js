import PropTypes from 'prop-types';

/**
 * @typedef {import('@mui/system').SxProps} SxProps
 */

const SxPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  PropTypes.func,
  PropTypes.object,
]);
export default SxPropType;
