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
import { useContext } from 'react';
import { Row, Col, Container } from 'reactstrap';

import Copyright from '@hypercube/client/components/Copyright';
import SiteCustomizationContext from '@hypercube/client/contexts/SiteCustomizationContext';

const Footer = () => {
  const { discordUrl, siteName, sourceRepo } = useContext(SiteCustomizationContext);
  return (
    <footer>
      <Container className="pt-3">
        <Row>
          <Col xs="6" sm="3">
            <small>
              <h6 className="footer-header">Content</h6>
              <ul className="footer-ul pl-0">
                <li>
                  <a className="footer-link" href="/content/browse">
                    Browse
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/content/articles">
                    Articles
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/content/podcasts">
                    Podcasts
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/content/videos">
                    Videos
                  </a>
                </li>
              </ul>
            </small>
          </Col>
          <Col xs="6" sm="3">
            <small>
              <h6 className="footer-header">Cube</h6>
              <ul className="footer-ul pl-0">
                <li>
                  <a className="footer-link" href="/explore">
                    Explore Cubes
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/search">
                    Search Cubes
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/random">
                    Random Cube
                  </a>
                </li>
              </ul>
            </small>
          </Col>
          <Col xs="6" sm="3">
            <small>
              <h6 className="footer-header">Cards</h6>
              <ul className="footer-ul pl-0">
                <li>
                  <a className="footer-link" href="/tool/topcards">
                    Top Cards
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/tool/searchcards">
                    Search Cards
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/packages/browse">
                    Packages
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/tool/randomcard">
                    Random Card
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/filters">
                    Filter Syntax
                  </a>
                </li>
              </ul>
            </small>
          </Col>
          <Col xs="6" sm="3">
            <small>
              <h6 className="footer-header">Info</h6>
              <ul className="footer-ul pl-0">
                <li>
                  <a className="footer-link" href="/dev/blog">
                    Dev Blog
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.inkedgaming.com/collections/artists-gwen-dekker?rfsn=4250904.d3f372&utm_source=refersion&utm_medium=affiliate&utm_campaign=4250904.d3f372"
                  >
                    Merchandise
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/ourstory">
                    Our Story
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/faq">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className="footer-link" href="/donate">
                    Donate
                  </a>
                </li>
                <li>
                  <a className="footer-link" href={sourceRepo}>
                    Github
                  </a>
                </li>
              </ul>
            </small>
          </Col>
        </Row>
        <p className="center footer-text">
          <a className="footer-link" href="/privacy">
            Privacy Policy
          </a>
          {' | '}
          <a className="footer-link" href="/tos">
            Terms & Conditions
          </a>
          {' | '}
          <a className="footer-link" href="/cookies">
            Cookies
          </a>
          <br />
          Magic: The Gathering is ©{' '}
          <a className="footer-link" href="https://company.wizards.com/">
            Wizards of the Coast
          </a>
          . {siteName} is not affiliated nor produced nor endorsed by Wizards of the Coast.
          <br />
          All card images, mana symbols, expansions and art related to Magic the Gathering is a property of Wizards of
          the Coast/Hasbro.
          <br />
          This site is not affiliated nor endorsed by Scryfall LLC. This site endeavours to adhere to the Scryfall data
          guidelines.
          <br />
          Custom card images displayed on {siteName} are subject to the license terms under which they were uploaded to
          their hosts. {siteName} is not responsible for the content of custom card images. To report a custom card
          image violation, message the development team on{' '}
          <a className="footer-link" href={discordUrl}>
            Discord
          </a>
          .
          <br />
          <Copyright />
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
