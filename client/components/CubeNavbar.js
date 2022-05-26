import { Box, Button, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

const CubeNavItem = ({ link, activeLink, children }) => {
  const { cube } = useContext(CubeContext);
  if (link === activeLink) {
    return (
      <Button href={`/cube/${encodeURIComponent(getCubeId(cube))}/${link}`} variant="outlined">
        {children}
      </Button>
    );
  }
  return <Button href={`/cube/${encodeURIComponent(getCubeId(cube))}/${link}`}>{children}</Button>;
};
CubeNavItem.propTypes = {
  link: PropTypes.string.isRequired,
  activeLink: PropTypes.string.isRequired,
  children: PropTypes.node,
};
CubeNavItem.defaultProps = {
  children: false,
};

const CubeNavbar = ({ activeLink }) => {
  const { cube } = useContext(CubeContext);
  const subtitle = getCubeDescription(cube);
  return (
    <Toolbar sx={{ width: '100%', backgroundColor: 'background.darker', alignItems: 'center', display: 'flex' }}>
      <Box component="span">
        <Typography variant="h6">{cube.name}</Typography>
        {cube.type && <Typography variant="subtitle2"> ({subtitle})</Typography>}
      </Box>
      <Box
        component="span"
        sx={{
          marginLeft: 'auto',
          flexWrap: 'wrap',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CubeNavItem link="overview" activeLink={activeLink}>
          Overview
        </CubeNavItem>
        <CubeNavItem link="list" activeLink={activeLink}>
          List
        </CubeNavItem>
        <CubeNavItem link="playtest" activeLink={activeLink}>
          Playtest
        </CubeNavItem>
        <CubeNavItem link="analytics" activeLink={activeLink}>
          Analytics
        </CubeNavItem>
        <CubeNavItem link="blog" activeLink={activeLink}>
          Blog
        </CubeNavItem>
      </Box>
    </Toolbar>
  );
};
CubeNavbar.propTypes = {
  activeLink: PropTypes.string,
};
CubeNavbar.defaultProps = {
  activeLink: '',
};
export default CubeNavbar;
