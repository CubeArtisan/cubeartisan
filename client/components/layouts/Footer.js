/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import React, { useContext } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

import Copyright from '@cubeartisan/client/components/utils/Copyright.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';

const Footer = () => {
  const { discordUrl, siteName, sourceRepo } = useContext(SiteCustomizationContext);
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        color: 'grey.900',
        width: '100%',
        height: 'min-content',
      }}
    >
      <Container maxWidth="xl">
        <Grid container width="100%" columns={12}>
          <Grid item xs={6} sm={3} justifyContent="center" alignItems="center">
            <small>
              <Typography variant="h6">Content</Typography>
              <ul className="footer-ul pl-0">
                <li>
                  <Link href="/content">Browse</Link>
                </li>
                <li>
                  <Link href="/articles">Articles</Link>
                </li>
                <li>
                  <Link href="/podcasts">Podcasts</Link>
                </li>
                <li>
                  <Link href="/videos">Videos</Link>
                </li>
              </ul>
            </small>
          </Grid>
          <Grid item xs={6} sm={3}>
            <small>
              <Typography variant="h6">Cube</Typography>
              <ul className="footer-ul pl-0">
                <li>
                  <Link href="/cubes/explore">Explore Cubes</Link>
                </li>
                <li>
                  <Link href="/cubes/search">Search Cubes</Link>
                </li>
                <li>
                  <Link href="/cubes/random">Random Cube</Link>
                </li>
              </ul>
            </small>
          </Grid>
          <Grid item xs={6} sm={3}>
            <small>
              <Typography variant="h6">Cards</Typography>
              <ul className="footer-ul pl-0">
                <li>
                  <Link href="/cards/search">Search Cards</Link>
                </li>
                <li>
                  <Link href="/packages">Packages</Link>
                </li>
                <li>
                  <Link href="/cards/random">Random Card</Link>
                </li>
                <li>
                  <Link href="/filters">Filter Syntax</Link>
                </li>
              </ul>
            </small>
          </Grid>
          <Grid item xs={6} sm={3}>
            <small>
              <Typography variant="h6">Info</Typography>
              <ul className="footer-ul pl-0">
                <li>
                  <Link href="/dev/blog">Dev Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/ourstory">Our Story</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href={sourceRepo}>Github</Link>
                </li>
              </ul>
            </small>
          </Grid>
        </Grid>
        <Typography align="center" variant="body2">
          <Link href="/privacy">Privacy Policy</Link>
          {' | '}
          <Link href="/tos">Terms & Conditions</Link>
          {' | '}
          <Link href="/cookies">Cookies</Link>
          <br />
          Magic: The Gathering is © <Link href="https://company.wizards.com/">Wizards of the Coast</Link>. {siteName} is
          not affiliated nor produced nor endorsed by Wizards of the Coast.
          <br />
          All card images, mana symbols, expansions and art related to Magic the Gathering is a property of Wizards of
          the Coast/Hasbro.
          <br />
          This site is not affiliated nor endorsed by Scryfall LLC. This site endeavours to adhere to the Scryfall data
          guidelines.
          <br />
          Custom card images displayed on {siteName} are subject to the license terms under which they were uploaded to
          their hosts. {siteName} is not responsible for the content of custom card images. To report a custom card
          image violation, message the development team on <Link href={discordUrl}>Discord</Link>
          .
          <br />
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
