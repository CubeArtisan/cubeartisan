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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useContext, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap';

import Changelist from '@cubeartisan/client/components/Changelist.js';
import ChangelistContext, {
  ChangelistContextProvider,
} from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import { getCard } from '@cubeartisan/client/components/EditCollapse.js';
import { AutocompleteCardField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import CSRFForm from '@cubeartisan/client/components/utils/CSRFForm.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const BulkUploadPageRaw = ({ cubeID, missing, blogpost, cube }) => {
  const [loading, setLoading] = useState(false);

  const { addChange } = useContext(ChangelistContext);

  const formRef = useRef();

  const handleAdd = useCallback(
    async (addValue) => {
      try {
        setLoading(true);
        const card = await getCard(cubeID, addValue);
        if (!card) {
          return;
        }
        addChange({ add: { details: card } });
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    },
    [addChange, cubeID],
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
              {missing.map((card, index) => (
                <Fragment key={/* eslint-disable-line react/no-array-index-key */ index}>
                  {card}
                  <br />
                </Fragment>
              ))}
            </Col>
            <Col>
              <AutocompleteCardField
                InputProps={{ placeholder: 'Card to Add' }}
                submitButtonText="Add card"
                submitButtonProps={{ color: 'success', loading }}
                onSubmit={handleAdd}
              />
              <CSRFForm method="POST" action={`/cube/${cubeID}`} ref={formRef}>
                <Label>Changelist:</Label>
                <div className="changelist-container mb-2">
                  <Changelist />
                </div>
                <Input type="hidden" name="title" value={blogpost.title} />
                <Input type="hidden" name="blog" value={blogpost.html} />
                <Button color="success" type="submit" fullWidth variant="outlined">
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
  missing: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  blogpost: PropTypes.shape({
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

export const BulkUploadPage = ({ cubeID, added, loginCallback, ...props }) => (
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
