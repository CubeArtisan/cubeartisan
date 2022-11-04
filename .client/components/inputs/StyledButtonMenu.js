import { ArrowDropDown, Menu as MenuIcon } from '@mui/icons-material';
import { Button, Link, Menu, MenuItem, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

const StyledButtonMenu = ({ component: Component, tooltip, menuItems, color, arrow, children }) => {
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
        <Component color={color} onClick={handleClick} endIcon={arrow && <ArrowDropDown />}>
          {children}
        </Component>
      </Tooltip>
      {menuItems && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          sx={{ display: 'flex', flexFlow: 'column' }}
          MenuListProps={{
            sx: { display: 'flex', flexFlow: 'column' },
          }}
        >
          {menuItems.map(({ text, link, onClick, component: Tag = MenuItem, extraProps = {} }, idx) => (
            <Tag
              key={`${text}-${idx}` /* eslint-disable-line */}
              component={Link}
              href={link}
              onClick={(event) => {
                handleClose();
                onClick?.(event);
              }}
              {...extraProps}
            >
              {text}
            </Tag>
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
  arrow: PropTypes.bool,
  component: PropTypes.elementType,
};
StyledButtonMenu.defaultProps = {
  menuItems: [],
  children: <MenuIcon />,
  tooltip: null,
  color: 'inherit',
  arrow: true,
  component: Button,
};
export default StyledButtonMenu;
