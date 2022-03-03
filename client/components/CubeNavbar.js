import React, { useContext } from 'react';
import { Box, Link, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

const CubeNavItem = ({ link, activeLink, children }) => {
  const { cube } = useContext(CubeContext);
  if (link === activeLink) {
    return (
      <Typography
        variant="subtitle1"
        sx={{ backgroundColor: 'background.paper', height: '100%', padding: 2, lineHeight: 1.5 }}
      >
        {children}
      </Typography>
    );
  }
  return (
    <Link
      variant="subtitle1"
      href={`/cube/${encodeURIComponent(getCubeId(cube))}/${link}`}
      color="primary"
      sx={{ height: '100%', padding: 2, lineHeight: 1.5 }}
    >
      {children}
    </Link>
  );
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
    <Toolbar sx={{ width: '100%', backgroundColor: 'background.darker', alignItems: 'end' }}>
      <Box>
        <Typography variant="h5">{cube.name}</Typography>
        {cube.type && <Typography variant="subtitle1"> ({subtitle})</Typography>}
      </Box>
      <Box sx={{ marginLeft: 'auto', flexFlow: 'row', flexWrap: 'wrap', height: '100%', display: 'flex' }}>
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