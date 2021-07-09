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
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'reactstrap';

import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import Footer from '@cubeartisan/client/layouts/Footer.js';
import LoginModal from '@cubeartisan/client/components/modals/LoginModal.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CardSearchBar from '@cubeartisan/client/components/CardSearchBar.js';
import { useContext } from 'react';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

const LoginModalButton = withModal(Button, LoginModal);

export const LandingPage = ({ numusers, numcubes, numdrafts }) => {
  const [loginIsOpen, toggleLoginModal] = useToggle(false);
  const { siteName } = useContext(SiteCustomizationContext);
  return (
    <div className="flex-container flex-vertical viewport">
      <Row className="m-0 p-0 flex-grow">
        <Col xs="12" sm="6" className="m-0 bg-green landing-half landing-logo-container">
          <img src="/content/LandingLogo.png" alt={siteName} className="landing-logo" />
        </Col>
        <Col xs="12" sm="6" className="m-0 bg-dark landing-half flex-container flex-vertical">
          <div className="mt-3 flex-container">
            <CardSearchBar />
          </div>
          <div className="flex-grow centered flex-vertical">
            <h4 className="center footer-text  mt-4">Build, playtest, and share your Magic the Gathering cube!</h4>
            <br />
            <h5 className="center footer-text">
              <strong>{numusers}</strong>
              {' Users, '}
              <strong>{numcubes}</strong>
              {' Cubes, '}
              <strong>{numdrafts}</strong>
              {' Completed Drafts'}
            </h5>
            <Button href="/user" className="landing-btn my-3" color="success">
              Sign Up
            </Button>
            <LoginModalButton
              modalProps={{ loginCallback: '/' }}
              className="landing-btn mb-3"
              color="success"
              outline
              isOpen={loginIsOpen}
              toggle={toggleLoginModal}
            >
              Login
            </LoginModalButton>
            <span data-ccpa-link="1" />
          </div>
          <Footer />
        </Col>
      </Row>
    </div>
  );
};

LandingPage.propTypes = {
  numusers: PropTypes.string.isRequired,
  numcubes: PropTypes.string.isRequired,
  numdrafts: PropTypes.string.isRequired,
};

export default RenderToRoot(LandingPage);
