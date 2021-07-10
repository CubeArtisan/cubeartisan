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
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Spinner,
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  UncontrolledAlert,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput,
  Input,
} from 'reactstrap';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import Tab from '@cubeartisan/client/components/Tab.js';
import CreatePackageModal from '@cubeartisan/client/components/modals/CreatePackageModal.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CardPackage from '@cubeartisan/client/components/CardPackage.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';

const CreatePackageModalLink = withModal(Button, CreatePackageModal);

const PAGE_SIZE = 20;

const tabTypes = {
  '0': 'approved',
  '1': 'pending',
  '2': 'yourpackages',
};

export const BrowsePackagesPage = ({ loginCallback }) => {
  const user = useContext(UserContext);
  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useQueryParam('p', 0);
  const [filter, setFilter] = useQueryParam('f', '');
  const [filterTemp, setFilterTemp] = useState('');
  const [sort, setSort] = useQueryParam('s', 'votes');
  const [sortDirection, setSortDirection] = useQueryParam('d', '-1');
  const [selectedTab, setSelectedTab] = useQueryParam('tab', '0');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const addAlert = (color, message) => {
    setAlerts([...alerts, { color, message }]);
    setRefresh(true);
  };

  const changeTab = (i) => {
    setPage(0);
    setSelectedTab(i);
  };

  useEffect(() => {
    (async () => {
      if (refresh) {
        setRefresh(false);
      }
      setLoading(true);
      const post = filter.length > 0 ? `${filter}` : '';
      const response = await csrfFetch(`/packages/${tabTypes[selectedTab]}/${page}/${sort}/${sortDirection}/${post}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          setTotal(json.total);
          setLoading(false);
          setPackages(json.packages);
        }
      }
      setFilterTemp(filter);
    })();
  }, [filter, page, sort, sortDirection, selectedTab, refresh, setRefresh]);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      {alerts.map(({ color, message }, index) => (
        <UncontrolledAlert color={color} key={/* eslint-disable-line react/no-array-index-key */ index}>
          {message}
        </UncontrolledAlert>
      ))}
      <Card>
        <div className="usercontrols pt-3 mb-3">
          <Row className="pb-3 mr-1">
            <Col xs="6">
              <h3 className="mx-3">Browse Card Packages</h3>
            </Col>
            {user && (
              <Col xs="6">
                <div className="text-right">
                  <CreatePackageModalLink
                    outline
                    color="success"
                    modalProps={{
                      onError: (message) => {
                        addAlert('danger', message);
                      },
                      onSuccess: (message) => {
                        addAlert('success', message);
                      },
                    }}
                  >
                    Create New Package
                  </CreatePackageModalLink>
                </div>
              </Col>
            )}
          </Row>
          <InputGroup className="mb-3 px-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText htmlFor="filterInput">Keywords</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="Search for keywords or packages that include a card..."
              disabled={loading}
              valid={filterTemp !== filter}
              value={filterTemp}
              onChange={(e) => setFilterTemp(e.target.value)}
              onKeyDown={(e) => e.keyCode === 13 && setFilter(filterTemp)}
            />
            <InputGroupAddon addonType="append">
              <Button color="success" className="square-left" onClick={() => setFilter(filterTemp)}>
                Apply
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Row className="px-3">
            <Col xs={12} sm={6}>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Sort: </InputGroupText>
                </InputGroupAddon>
                <CustomInput type="select" value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="votes">Votes</option>
                  <option value="date">Date</option>
                </CustomInput>
              </InputGroup>
            </Col>
            <Col xs={12} sm={6}>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Direction: </InputGroupText>
                </InputGroupAddon>
                <CustomInput
                  type="select"
                  value={sortDirection}
                  onChange={(event) => setSortDirection(event.target.value)}
                >
                  <option value="1">Ascending</option>
                  <option value="-1">Descending</option>
                </CustomInput>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <Nav tabs>
          <Tab tab={selectedTab} setTab={changeTab} index="0">
            Approved
          </Tab>
          <Tab tab={selectedTab} setTab={changeTab} index="1">
            Submitted
          </Tab>
          {user && (
            <Tab tab={selectedTab} setTab={changeTab} index="2">
              Your Packages
            </Tab>
          )}
        </Nav>
        <CardBody>
          {total / PAGE_SIZE > 1 && (
            <Paginate count={Math.ceil(total / PAGE_SIZE)} active={page} onClick={(i) => setPage(i)} />
          )}
          {loading ? (
            <div className="centered py-3">
              <Spinner className="position-absolute" />
            </div>
          ) : (
            packages.map((pack) => <CardPackage key={pack._id} cardPackage={pack} refresh={() => setRefresh(true)} />)
          )}
          {total / PAGE_SIZE > 1 && (
            <Paginate count={Math.ceil(total / PAGE_SIZE)} active={page} onClick={(i) => setPage(i)} />
          )}
        </CardBody>
      </Card>
    </MainLayout>
  );
};

BrowsePackagesPage.propTypes = {
  loginCallback: PropTypes.string,
};

BrowsePackagesPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(BrowsePackagesPage);
