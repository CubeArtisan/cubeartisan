import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

import ContainerBody from '@cubeartisan/client/components/containers/ContainerBody.js';
import ContainerFooter from '@cubeartisan/client/components/containers/ContainerFooter.js';
import ContainerHeader from '@cubeartisan/client/components/containers/ContainerHeader.js';
import HeaderFooter from '@cubeartisan/client/components/containers/HeaderFooter.js';

/**
 * @typedef {import('@mui/system').SxProps} SxProps
 * @typedef LayoutContainerProps
 * @property {SxProps} [sx]
 * @property {React.ReactNode} children
 */
/**
 * @type {React.FC<LayoutContainerProps>}
 */
export const LayoutContainer = ({ children, sx, ...props }) => (
  <HeaderFooter component={Paper} sx={{ borderRadius: '16px', padding: 0, ...sx }} {...props}>
    {children}
  </HeaderFooter>
);
LayoutContainer.propTypes = {
  // @ts-ignore
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
};
LayoutContainer.defaultProps = {
  sx: {},
};
export default LayoutContainer;
export { ContainerHeader, ContainerBody, ContainerFooter };
