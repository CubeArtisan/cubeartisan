import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

import ContainerBody from '@cubeartisan/client/components/containers/ContainerBody.js';
import ContainerFooter from '@cubeartisan/client/components/containers/ContainerFooter.js';
import ContainerHeader from '@cubeartisan/client/components/containers/ContainerHeader.js';
import HeaderFooter from '@cubeartisan/client/components/utils/HeaderFooter.js';

export const LayoutContainer = ({ children, sx, ...props }) => (
  <HeaderFooter component={Paper} sx={{ borderRadius: '16px', padding: 0, ...sx }} {...props}>
    {children}
  </HeaderFooter>
);
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
};
LayoutContainer.defaultProps = {
  sx: {},
};
export default LayoutContainer;
export { ContainerHeader, ContainerBody, ContainerFooter };
