import { ArrowDropDown, Menu as MenuIcon } from '@mui/icons-material';
import { Button, Link, Menu, MenuItem, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const StyledButtonMenu = ({ tooltip, menuItems, color, children }) => {
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
        <Button color={color} onClick={handleClick} endIcon={<ArrowDropDown />}>
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
          {menuItems.map(({ text, link, onClick, component: Component = MenuItem, extraProps = {} }) => (
            <Component
              key={text}
              component={Link}
              href={link}
              onClick={(event) => {
                handleClose();
                onClick?.(event);
              }}
              {...extraProps}
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
      extraProps: PropTypes.shape({}),
    }),
  ),
  children: PropTypes.node,
  tooltip: PropTypes.string,
  color: PropTypes.string,
};
StyledButtonMenu.defaultProps = {
  menuItems: [],
  children: MenuIcon,
  tooltip: null,
  color: 'inherit',
};
export default StyledButtonMenu;
