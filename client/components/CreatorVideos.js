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
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button.js';
import { Navbar, Nav, NavItem, Row, Col, CardBody } from 'reactstrap';

import LoadingPage from '@cubeartisan/client/pages/LoadingPage.js';
import VideoPreview from '@cubeartisan/client/components/VideoPreview.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';

const PAGE_SIZE = 24;

const CreatorVideos = () => {
  const user = useContext(UserContext);

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useQueryParam('page', 0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await csrfFetch(`/user/${user._id}/videos/${page}`);
      if (!response.ok) {
        console.warn(response);
      }
      const json = await response.json();

      setPages(Math.ceil(json.numResults / PAGE_SIZE));
      setVideos(json.videos);
      setLoading(false);
    };
    fetchData();
  }, [page, user]);

  const updatePage = (index) => {
    setLoading(true);
    setPage(index);
  };

  // TODO: Make video creation a POST request.
  return (
    <>
      <Navbar light expand className="usercontrols mb-3">
        <Nav navbar>
          <NavItem>
            <form method="POST" action="/creators/video">
              <Button type="submit" color="primary">
                Create New Video
              </Button>
            </form>
          </NavItem>
        </Nav>
      </Navbar>
      {pages > 1 && (
        <CardBody className="pt-0">
          <Paginate count={pages} active={page} onClick={(i) => updatePage(i)} />
        </CardBody>
      )}
      {loading ? (
        <LoadingPage />
      ) : (
        <Row className="px-3">
          {videos.map((video) => (
            <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
              <VideoPreview video={video} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default CreatorVideos;
