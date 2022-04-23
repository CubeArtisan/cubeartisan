import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Link, Menu, MenuItem, Tooltip } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const StyledButtonMenu = ({ tooltip, menuItems, children }) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  return (
    <>
      <Tooltip title={tooltip} enterDelay={300} arrow>
        <Button color="inherit" onClick={handleClick}>
          {children}
        </Button>
      </Tooltip>
      {menuItems && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
        >
          {menuItems.map(({ text, link, onClick, component: Component = MenuItem }) => (
            <Component
              key={text}
              component={Link}
              href={link}
              onClick={(event) => {
                handleClose();
                onClick?.(event);
              }}
            >
              {text}
            </Component>
          ))}
        </Menu>
      )}
    </>
  );
};
StyledButtonMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
      onClick: PropTypes.func,
      component: PropTypes.func,
    }),
  ),
  children: PropTypes.node,
  tooltip: PropTypes.string,
};
StyledButtonMenu.defaultProps = {
  menuItems: [],
  children: MenuIcon,
  tooltip: null,
};
export default StyledButtonMenu;
