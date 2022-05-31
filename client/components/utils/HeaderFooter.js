import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Children } from 'react';

const HeaderFooter = ({ children, component: Component, sx, ...props }) => {
  const childArray = Children.toArray(children);
  const numChildren = Children.count(children);
  if (numChildren > 3) throw new Error('Too many children provided to LayoutContainer');
  return (
    <Component sx={{ ...sx, display: 'flex', flexFlow: 'column' }} {...props}>
      {childArray.length > 1 && childArray[0]}
      {childArray.length > 1 ? childArray[1] : childArray[0]}
      {childArray.length > 2 && <Box sx={{ marginTop: 'auto' }}>{childArray[2]}</Box>}
    </Component>
  );
};
HeaderFooter.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.elementType,
  sx: PropTypes.shape({}),
};
HeaderFooter.defaultProps = {
  component: Box,
  sx: {},
};
export default HeaderFooter;
