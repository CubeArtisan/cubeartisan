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
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

import { TagContextProvider } from '@cubeartisan/client/components/contexts/TagContext.js';
import {
  AutocompleteCardField,
  AutocompleteTagField,
} from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import TextEntry from '@cubeartisan/client/components/inputs/TextEntry.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

/**
 * A utility for safely picking the current working description from a Cube.
 *
 * @param { Cube } cube
 * @returns { string }
 */
const pickDescriptionFromCube = (cube) =>
  /** 2020-11-24 strusdell:
   * @phulin believes that the check for the string literal 'undefined' here is
   * deliberate. Presumably this would represent bad data, and should be ignored.
   *
   * NOTE: This may introduce weird behavior if the user enters 'undefined' as their
   * description.
   */
  Object.prototype.hasOwnProperty.call(cube, 'raw_desc') && cube.raw_desc !== 'undefined'
    ? cube.raw_desc
    : cube.description;
const CubeOverviewModal = ({ cube: savedCube, onError, onCubeUpdate, userID, isOpen, toggle }) => {
  const [tags, setTags] = useState((savedCube.tags ?? []).map((tag) => ({ id: tag, text: tag })));
  const [cube, setCube] = useState(JSON.parse(JSON.stringify(savedCube)));
  const [urlChanged, setUrlChanged] = useState(false);
  const [imageDict, setImageDict] = useState({});

  useEffect(() => {
    (async () => {
      // load the card images
      const imageResp = await fetch('/cards/images/dict');
      const imageJson = await imageResp.json();
      setImageDict(imageJson.dict);
    })();
  }, []);

  const changeDescription = useCallback(
    (event) => setCube((prevCube) => ({ ...prevCube, raw_desc: event.target.value })),
    [setCube],
  );

  const changeImageName = useCallback(
    (value) => {
      if (imageDict[value.toLowerCase()]) {
        const { uri, artist } = imageDict[value.toLowerCase()];
        setCube((prevCube) => ({ ...prevCube, image_name: value, imageArtist: artist, image_uri: uri }));
      } else {
        setCube((prevCube) => ({ ...prevCube, image_name: value }));
      }
    },
    [imageDict],
  );

  const handleChange = useCallback(
    (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      if (target.name === 'category_prefix') {
        const id = target.value;
        let prefixes = cube.categoryPrefixes;

        if (prefixes.includes(id) && !value) {
          prefixes = prefixes.filter((e) => e !== id);
        } else if (!prefixes.includes(id) && value) {
          prefixes.push(id);
        }
        setCube((prevCube) => ({ ...prevCube, categoryPrefixes: prefixes }));
      } else {
        if (target.name === 'shortID') setUrlChanged(true);
        setCube((prevCube) => ({ ...prevCube, [target.name]: value }));
      }
    },
    [cube.categoryPrefixes],
  );

  const handleApply = useCallback(
    async (event) => {
      event.preventDefault();

      const newCube = { ...cube };
      newCube.tags = tags.map((tag) => tag.text);
      newCube.description = cube.raw_desc;
      const response = await csrfFetch(`/cube/${cube._id}/overview`, {
        method: 'PUT',
        body: JSON.stringify(newCube),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (response.ok) {
        if (urlChanged) {
          window.location.href = `/cube/${encodeURIComponent(getCubeId(newCube))}`;
        }
        onCubeUpdate(cube);
      } else if (json.message) {
        onError(json.message);
      } else if (json.errors) {
        for (const error of json.errors) {
          onError(error);
        }
      }
      toggle();
    },
    [toggle, onError, cube, tags, urlChanged, onCubeUpdate],
  );

  return (
    <TagContextProvider
      cubeID={getCubeId(savedCube)}
      defaultTagColors={cube.tag_colors}
      defaultShowTagColors={false}
      defaultTags={[]}
      userID={userID}
    >
      <Modal size="lg" isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Overview</ModalHeader>
        <form autoComplete="off">
          <ModalBody>
            <h6>Cube Name</h6>
            <input
              className="form-control"
              name="name"
              type="text"
              value={cube.name}
              required
              onChange={handleChange}
            />
            <br />

            <h6>Options</h6>
            <div className="form-check">
              <Label className="form-check-label">
                <input
                  className="form-check-input"
                  name="overrideCategory"
                  type="checkbox"
                  checked={cube.overrideCategory}
                  onChange={handleChange}
                />
                Override Cube Category
              </Label>
            </div>
            <br />

            <h6>Category</h6>

            <input className="form-control" name="name" type="text" disabled value={getCubeDescription(cube)} />

            <Row>
              <Col>
                <FormGroup tag="fieldset">
                  {['Vintage', 'Legacy+', 'Legacy', 'Modern', 'Pioneer', 'Historic', 'Standard', 'Set'].map((label) => (
                    <FormGroup check key={label}>
                      <Label check>
                        <Input
                          type="radio"
                          name="categoryOverride"
                          value={label}
                          disabled={!cube.overrideCategory}
                          checked={cube.categoryOverride === label}
                          onChange={handleChange}
                        />{' '}
                        {label}
                      </Label>
                    </FormGroup>
                  ))}
                </FormGroup>
              </Col>
              <Col>
                {[
                  'Powered',
                  'Unpowered',
                  'Pauper',
                  'Peasant',
                  'Budget',
                  'Silver-bordered',
                  'Commander',
                  'Battle Box',
                  'Multiplayer',
                  'Judge Tower',
                ].map((label) => (
                  <div className="form-check" key={label}>
                    <input
                      className="form-check-input"
                      name="category_prefix"
                      id={`categoryPrefix${label}`}
                      value={label}
                      type="checkbox"
                      checked={(cube.categoryPrefixes ? cube.categoryPrefixes : []).includes(label)}
                      onChange={handleChange}
                      disabled={!cube.overrideCategory}
                    />
                    <label className="form-check-label" htmlFor={`categoryPrefix${label}`}>
                      {label}
                    </label>
                  </div>
                ))}
              </Col>
            </Row>

            <h6>Image</h6>
            <Row>
              <Col xs="12" sm="6" md="6" lg="6">
                <Card>
                  <CardHeader>Preview</CardHeader>
                  <img className="card-img-top w-100" alt={cube.image_name} src={cube.image_uri} />
                  <CardBody>
                    <p>Art by: {cube.image_artist}</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <AutocompleteCardField
              fullNames
              InputProps={{ name: 'remove', placeholder: 'Cardname for Image' }}
              defaultValue={{ name: cube.image_name, cubeID: null }}
              onSubmit={changeImageName}
            />
            <br />

            <h6>Description</h6>
            <TextEntry
              name="blog"
              value={pickDescriptionFromCube(cube)}
              onChange={changeDescription}
              maxLength={100000}
            />
            <FormText>
              Having trouble formatting your posts? Check out the{' '}
              <a href="/markdown" target="_blank">
                markdown guide
              </a>
              .
            </FormText>
            <br />

            <h6>Tags</h6>
            <AutocompleteTagField
              tags={tags}
              updateTags={setTags}
              freeSolo
              multiple
              InputProps={{ name: 'tagInput', placeholder: 'Tags to describe your cube', fullWidth: true }}
            />
            <br />

            <h6>Short ID</h6>
            <input
              className="form-control"
              id="shortID"
              name="shortID"
              type="text"
              value={cube.shortID}
              onChange={handleChange}
              required
              placeholder="Give this cube an easy to remember URL."
            />
            <FormText>Changing the short ID may break existing links to your cube.</FormText>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>{' '}
            <LoadingButton color="success" onClick={handleApply}>
              Save Changes
            </LoadingButton>
          </ModalFooter>
        </form>
      </Modal>
    </TagContextProvider>
  );
};
CubeOverviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  cube: CubePropType.isRequired,
  onError: PropTypes.func.isRequired,
  onCubeUpdate: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};
export default CubeOverviewModal;
