import { Box, Button, Link, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Children, Fragment, isValidElement, useMemo } from 'react';

import StyledButtonMenu from '@cubeartisan/client/components/inputs/StyledButtonMenu.js';

const CollapsingNavbar = ({ children, sx, breakpoint, component }) => {
  const { breakpoints } = useTheme();
  const collapse = useMediaQuery(breakpoints.down(breakpoint));
  const collapsedMenuItems = useMemo(() => {
    const menuItems = [];
    if (collapse) {
      const processElement = (element) => {
        if (isValidElement(element)) {
          if (element.type === StyledButtonMenu) {
            menuItems.push({
              text: element.props.children,
              component: StyledButtonMenu,
              extraProps: { ...element.props, arrow: false },
            });
          } else if (element.type.name === 'NotificationsNav') {
            menuItems.push({ component: element.type, extraProps: { ...element.props, inMenu: true } });
          } else if (element.type === Link) {
            menuItems.push({
              text: element.props.children,
              component: MenuItem,
              link: element.props.href,
            });
          } else if (element.type === Button) {
            menuItems.push({
              text: element.props.children,
              component: Button,
              onClick: element.props.onClick,
              extraProps: { variant: element.props.variant },
              link: element.props.href,
            });
          } else if (element.type === Fragment) {
            Children.forEach(element.props.children, processElement);
          } else {
            console.error('Could not translate element', element);
            menuItems.push({ component: element.type, extraProps: element.props });
          }
        }
      };
      Children.forEach(children, processElement);
    }
    return menuItems;
  }, [children, collapse]);
  return (
    <Box component={component} sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      {collapse ? <StyledButtonMenu arrow={false} menuItems={collapsedMenuItems} /> : children}
    </Box>
  );
};
CollapsingNavbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
  breakpoint: PropTypes.number,
  component: PropTypes.elementType,
};
CollapsingNavbar.defaultProps = {
  sx: {},
  breakpoint: 720,
  component: 'nav',
};
export default CollapsingNavbar;
