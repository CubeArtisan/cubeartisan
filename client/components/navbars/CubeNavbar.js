import { Box, Button, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import CollapsingNavbar from '@cubeartisan/client/components/containers/CollapsingNavbar.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

const CubeNavbar = ({ activeLink }) => {
  const { cube } = useContext(CubeContext);
  const subtitle = getCubeDescription(cube);
  return (
    <Toolbar sx={{ width: '100%', backgroundColor: 'background.darker', alignItems: 'center', display: 'flex' }}>
      <Box component="span">
        <Typography variant="h6">{cube.name}</Typography>
        {cube.type && <Typography variant="subtitle2"> ({subtitle})</Typography>}
      </Box>
      <CollapsingNavbar
        sx={{
          marginLeft: 'auto',
          height: '100%',
        }}
        breakpoint={720}
      >
        <Button
          key="overview"
          href={`/cube/${encodeURIComponent(getCubeId(cube))}/overview`}
          variant={activeLink === 'overview' ? 'outlined' : 'text'}
        >
          Overview
        </Button>
        <Button
          key="list"
          href={`/cube/${encodeURIComponent(getCubeId(cube))}/list`}
          variant={activeLink === 'list' ? 'outlined' : 'text'}
        >
          List
        </Button>
        <Button
          key="playtest"
          href={`/cube/${encodeURIComponent(getCubeId(cube))}/playtest`}
          variant={activeLink === 'playtest' ? 'outlined' : 'text'}
        >
          Playtest
        </Button>
        <Button
          key="analytics"
          href={`/cube/${encodeURIComponent(getCubeId(cube))}/analytics`}
          variant={activeLink === 'analytics' ? 'outlined' : 'text'}
        >
          Analytics
        </Button>
        <Button
          key="blog"
          href={`/cube/${encodeURIComponent(getCubeId(cube))}/blog`}
          variant={activeLink === 'blog' ? 'outlined' : 'text'}
        >
          Blog
        </Button>
      </CollapsingNavbar>
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
