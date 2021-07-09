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
import { Fragment, useCallback, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Form, Input, Label, Row, Card, CardBody, CardHeader } from 'reactstrap';

import AutocompleteInput from '@cubeartisan/client/components/AutocompleteInput.js';
import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';
import Changelist from '@cubeartisan/client/components/Changelist.js';
import ChangelistContext, {
  ChangelistContextProvider,
} from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import { getCard } from '@cubeartisan/client/components/EditCollapse.js';
import LoadingButton from '@cubeartisan/client/components/LoadingButton.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const BulkUploadPageRaw = ({ cubeID, missing, blogpost, cube }) => {
  const [addValue, setAddValue] = useState('');
  const [loading, setLoading] = useState(false);

  const { addChange } = useContext(ChangelistContext);

  const addInput = useRef();
  const formRef = useRef();

  const handleChange = useCallback((event) => setAddValue(event.target.value), []);

  const handleAdd = useCallback(
    async (event, newValue) => {
      event.preventDefault();
      try {
        setLoading(true);
        const card = await getCard(cubeID, newValue || addValue);
        if (!card) {
          return;
        }
        addChange({ add: { details: card } });
        setAddValue('');
        setLoading(false);
        if (addInput.current) {
          addInput.current.focus();
        }
      } catch (e) {
        console.error(e);
      }
    },
    [addChange, addValue, addInput, cubeID],
  );

  return (
    <CubeLayout cube={cube} activeLink="list">
      <Card className="mt-3">
        <CardHeader>
          <h5>Confirm Upload</h5>
        </CardHeader>
        <CardBody>
          <p>
            There were a few problems with your bulk upload. Below is a list of unrecognized cards, please go through
            and manually add them. No changes have been saved.
          </p>
          <Row>
            <Col>
              {missing.split('\n').map((card, index) => (
                <Fragment key={/* eslint-disable-line react/no-array-index-key */ index}>
                  {card}
                  <br />
                </Fragment>
              ))}
            </Col>
            <Col>
              <Form inline className="mb-2" onSubmit={handleAdd}>
                <AutocompleteInput
                  treeUrl="/cube/api/cardnames"
                  treePath="cardnames"
                  type="text"
                  className="mr-2"
                  innerRef={addInput}
                  value={addValue}
                  onChange={handleChange}
                  onSubmit={handleAdd}
                  placeholder="Card to Add"
                />
                <LoadingButton color="success" type="submit" disabled={addValue.length === 0} loading={loading}>
                  Add
                </LoadingButton>
              </Form>
              <CSRFForm method="POST" action={`/cube/edit/${cubeID}`} innerRef={formRef}>
                <Label>Changelist:</Label>
                <div className="changelist-container mb-2">
                  <Changelist />
                </div>
                <Input type="hidden" name="title" value={blogpost.title} />
                <Input type="hidden" name="blog" value={blogpost.html} />
                <Button color="success" type="submit" className="mt-3" block outline>
                  Save Changes
                </Button>
              </CSRFForm>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </CubeLayout>
  );
};

BulkUploadPageRaw.propTypes = {
  cubeID: PropTypes.string.isRequired,
  missing: PropTypes.string.isRequired,
  blogpost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

const BulkUploadPage = ({ cubeID, added, loginCallback, ...props }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <ChangelistContextProvider
      cubeID={cubeID}
      noSave
      initialChanges={added.map((details, index) => ({ add: { details }, id: index }))}
      setOpenCollapse={() => {}}
    >
      <BulkUploadPageRaw cubeID={cubeID} {...props} />
    </ChangelistContextProvider>
  </MainLayout>
);

BulkUploadPage.propTypes = {
  cubeID: PropTypes.string.isRequired,
  added: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_normal: PropTypes.string.isRequired,
    }),
  ).isRequired,
  ...BulkUploadPageRaw.propTypes,
  loginCallback: PropTypes.string,
};

BulkUploadPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(BulkUploadPage);
