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
import React, { lazy, useContext, useCallback, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavLink,
  NavItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  UncontrolledCollapse,
} from 'reactstrap';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import useAlerts, { Alerts } from '@cubeartisan/client/hooks/UseAlerts.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import { allBotsDraft } from '@cubeartisan/client/drafting/draftutil.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';

const DeckPreview = lazy(() => import('@cubeartisan/client/components/DeckPreview.js'));
const CustomDraftFormatModal = lazy(() => import('@cubeartisan/client/components/modals/CustomDraftFormatModal.js'));

const range = (lo, hi) => Array.from(Array(hi - lo).keys(), (n) => n + lo);
const rangeOptions = (lo, hi) => range(lo, hi).map((n) => <option key={n}>{n}</option>);

const CardTitleH5 = ({ ...props }) => <CardTitle tag="h5" className="mb-0" {...props} />;

const UploadDecklistModal = ({ isOpen, toggle }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Modal isOpen={isOpen} toggle={toggle} labelledBy="uploadDecklistModalTitle">
      <CSRFForm method="POST" action={`/cube/${cubeID}/playtest/deck/import/plaintext`}>
        <ModalHeader toggle={toggle} id="uploadDecklistModalTitle">
          Upload Decklist
        </ModalHeader>
        <ModalBody>
          <p>
            Acceptable formats are: one card name per line, or one card name per line prepended with #x, such as
            &quot;2x island&quot;
          </p>
          <Input
            type="textarea"
            maxLength="20000"
            rows="10"
            placeholder="Paste Decklist Here (max length 20000)"
            name="body"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit">
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </CSRFForm>
    </Modal>
  );
};

UploadDecklistModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const UploadDecklistModalLink = withModal(NavLink, UploadDecklistModal);

const LabelRow = ({ htmlFor, label, children, ...props }) => (
  <FormGroup row {...props}>
    <Label xs="4" md="6" lg="5" htmlFor={htmlFor}>
      {label}
    </Label>
    <Col xs="8" md="6" lg="7">
      {children}
    </Col>
  </FormGroup>
);

LabelRow.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

const useBotsOnlyCallback = (botsOnly, cubeID) => {
  console.log(cubeID);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const { mtgmlServer } = useContext(SiteCustomizationContext);
  console.log(mtgmlServer);
  const submitForm = useCallback(
    async (e) => {
      setLoading(true);
      if (botsOnly) {
        e.preventDefault();
        const body = new FormData(formRef.current);
        const response = await csrfFetch(`/cube/${cubeID}/playtest/draft`, {
          method: 'POST',
          body,
        });

        const json = await response.json();

        const draft = await allBotsDraft(json.draft, mtgmlServer);
        for (const card of draft.cards) {
          delete card.details;
        }

        await csrfFetch(`/draft/${draft._id}`, {
          method: 'PUT',
          body: JSON.stringify(draft),
          headers: { 'Content-Type': 'application/json' },
        });

        const response2 = await csrfFetch(`/draft/${draft._id}/0/submit?skipDeckbuilder=1`, { method: 'POST' });
        const json2 = await response2.json();
        console.debug(json2.url);
        window.location.href = json2.url;
      }
    },
    [botsOnly, cubeID, formRef, mtgmlServer],
  );

  return [submitForm, formRef, loading];
};

const CustomDraftCard = ({
  format,
  onEditFormat,
  onDeleteFormat,
  onSetDefaultFormat,
  defaultDraftFormat,
  ...props
}) => {
  const { cubeID, canEdit } = useContext(CubeContext);
  const { index } = format;
  const [botsOnly, toggleBotsOnly] = useToggle(false);
  const [submitForm, formRef, loading] = useBotsOnlyCallback(botsOnly, cubeID);
  return (
    <Card {...props}>
      <CSRFForm
        method="POST"
        key="createDraft"
        action={`/cube/${cubeID}/playtest/draft`}
        ref={formRef}
        onSubmit={submitForm}
      >
        <CardHeader>
          <CardTitleH5>
            {defaultDraftFormat === index && 'Default Format: '}
            {format.title} (Custom Draft)
          </CardTitleH5>
        </CardHeader>
        <CardBody>
          <div className="mb-3">
            <Markdown markdown={format.markdown} />
          </div>

          <LabelRow htmlFor={`seats-${index}`} label="Total Seats">
            <Input type="select" name="seats" id={`seats-${index}`} defaultValue={format.defaultSeats ?? 8}>
              {rangeOptions(2, 17)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="humanSeats" label="Number of Human Seats">
            <Input type="select" name="humanSeats" id="humanSeats" defaultValue="1">
              {rangeOptions(1, 16)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="timeout" label="Timer: Seconds Per Card In Pack (Use 0 to disable timer).">
            <Input type="select" name="timeout" id="timeout" defaultValue="0">
              {rangeOptions(0, 31)}
            </Input>
          </LabelRow>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="botsOnly" value={botsOnly} onClick={toggleBotsOnly} /> Have just bots draft.
            </Label>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Input type="hidden" name="id" value={index} />
          <div className="justify-content-center align-items-center">
            {loading && <Spinner className="position-absolute" />}
            <LoadingButton color="success" variant="contained" loading={loading} type="submit">
              Start Draft
            </LoadingButton>
            {canEdit && (
              <>
                <Button color="success" onClick={onEditFormat} data-index={index}>
                  Edit
                </Button>
                {defaultDraftFormat !== index && (
                  <Button color="success" onClick={onSetDefaultFormat} data-index={index}>
                    Make Default
                  </Button>
                )}
                <Button color="warning" id={`deleteToggler-${index}`}>
                  Delete
                </Button>
                <UncontrolledCollapse toggler={`#deleteToggler-${index}`}>
                  <h6 className="my-4">Are you sure? This action cannot be undone.</h6>
                  <Button color="warning" onClick={onDeleteFormat} data-index={index}>
                    Yes, delete this format
                  </Button>
                </UncontrolledCollapse>
              </>
            )}
          </div>
        </CardFooter>
      </CSRFForm>
    </Card>
  );
};

CustomDraftCard.propTypes = {
  format: PropTypes.shape({
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    html: PropTypes.string,
    markdown: PropTypes.string,
    defaultSeats: PropTypes.number,
  }).isRequired,
  onEditFormat: PropTypes.func.isRequired,
  onDeleteFormat: PropTypes.func.isRequired,
  onSetDefaultFormat: PropTypes.func.isRequired,
  defaultDraftFormat: PropTypes.number.isRequired,
};

const StandardDraftCard = ({ onSetDefaultFormat, defaultDraftFormat }) => {
  const { cubeID, canEdit } = useContext(CubeContext);
  const [botsOnly, toggleBotsOnly] = useToggle(false);
  const [submitForm, formRef, loading] = useBotsOnlyCallback(botsOnly, cubeID);
  return (
    <Card className="mb-3">
      <CSRFForm method="POST" action={`/cube/${cubeID}/playtest/draft`} onSubmit={submitForm} ref={formRef}>
        <CardHeader>
          <CardTitleH5>{defaultDraftFormat === -1 && 'Default Format: '}Standard Draft</CardTitleH5>
        </CardHeader>
        <CardBody>
          <LabelRow htmlFor="packs" label="Number of Packs">
            <Input type="select" name="packs" id="packs" defaultValue="3">
              {rangeOptions(1, 16)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="cards" label="Cards per Pack">
            <Input type="select" name="cards" id="cards" defaultValue="15">
              {rangeOptions(1, 25)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="seats" label="Total Seats">
            <Input type="select" name="seats" id="seats" defaultValue="8">
              {rangeOptions(2, 17)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="humanSeats" label="Number of Human Seats">
            <Input type="select" name="humanSeats" id="humanSeats" defaultValue="1">
              {rangeOptions(1, 16)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="timeout" label="Timer: Seconds Per Card In Pack (Use 0 to disable timer).">
            <Input type="select" name="timeout" id="timeout" defaultValue="0">
              {rangeOptions(0, 31)}
            </Input>
          </LabelRow>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="botsOnly" onClick={toggleBotsOnly} value={botsOnly} /> Have just bots draft.
            </Label>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Input type="hidden" name="id" value="-1" />
          <div className="justify-content-center align-items-center">
            <LoadingButton color="success" variant="contained" type="submit" loading={loading}>
              Start Draft
            </LoadingButton>
          </div>
          {canEdit && defaultDraftFormat !== -1 && (
            <Button color="success" onClick={onSetDefaultFormat} data-index={-1}>
              Make Default
            </Button>
          )}
        </CardFooter>
      </CSRFForm>
    </Card>
  );
};

StandardDraftCard.propTypes = {
  onSetDefaultFormat: PropTypes.func.isRequired,
  defaultDraftFormat: PropTypes.number.isRequired,
};

const GridCard = () => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Card className="mb-3">
      <CSRFForm method="POST" action={`/cube/${cubeID}/playtest/griddraft`}>
        <CardHeader>
          <CardTitleH5>Grid Draft</CardTitleH5>
        </CardHeader>
        <CardBody>
          <div className="description-area">
            <p>Grid drafting is a strategic 2 player draft with completely open information.</p>
          </div>
          <LabelRow htmlFor="packs-grid" label="Number of Packs">
            <Input type="select" name="packs" id="packs-grid" defaultValue="18">
              {rangeOptions(1, 30)}
            </Input>
          </LabelRow>
          <LabelRow htmlFor="type-grid" label="Type">
            <Input type="select" name="type" id="type-grid" defaultValue="18">
              <option value="bot">Against Bot</option>
              <option value="2playerlocal">2 Player Local</option>
            </Input>
          </LabelRow>
        </CardBody>
        <CardFooter>
          <Button color="success">Start Grid Draft</Button>
        </CardFooter>
      </CSRFForm>
    </Card>
  );
};

const DecksCard = ({ decks, ...props }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitleH5>Recent Decks</CardTitleH5>
      </CardHeader>
      <CardBody className="p-0">
        <Suspense>
          {decks.map((deck) => (
            <DeckPreview key={deck._id} deck={deck} />
          ))}
        </Suspense>
      </CardBody>
      <CardFooter>
        <a href={`/cube/${cubeID}/playtest/decks/0`}>View all</a>
      </CardFooter>
    </Card>
  );
};

DecksCard.propTypes = {
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
};

const SamplePackCard = (props) => {
  const { cubeID } = useContext(CubeContext);
  const [seed, setSeed] = useState('');
  const handleChange = useCallback((event) => setSeed(event.target.value), []);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitleH5>View sample pack</CardTitleH5>
      </CardHeader>
      <CardBody>
        <LabelRow htmlFor="seed" label="Seed" className="mb-0">
          <Input type="text" name="seed" id="seed" value={seed} onChange={handleChange} />
        </LabelRow>
      </CardBody>
      <CardFooter>
        <Button color="success" href={`/cube/${cubeID}/playtest/sample`}>
          View Random
        </Button>
        <Button color="success" disabled={!seed} href={`/cube/${cubeID}/playtest/sample/${seed}`}>
          View Seeded
        </Button>
      </CardFooter>
    </Card>
  );
};

const DEFAULT_FORMAT = {
  title: 'Unnamed Format',
  multiples: false,
  markdown: '',
  packs: [{ slots: ['rarity:Mythic', 'tag:new', 'identity>1'], steps: null }],
};
export const CubePlaytestPage = ({ cube, decks, loginCallback }) => {
  const user = useContext(UserContext);

  const { alerts, addAlert } = useAlerts();
  const [formats, setFormats] = useState(cube.draft_formats ?? []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormatIndex, setEditFormatIndex] = useState(-1);
  const [editFormat, setEditFormat] = useState({});
  const [defaultDraftFormat, setDefaultDraftFormat] = useState(cube.defaultDraftFormat ?? -1);

  const toggleEditModal = useCallback(() => setEditModalOpen((open) => !open), []);

  const handleCreateFormat = useCallback(() => {
    setEditFormat(DEFAULT_FORMAT);
    setEditFormatIndex(-1);
    setEditModalOpen(true);
  }, []);

  const handleEditFormat = useCallback(
    (event) => {
      const formatIndex = parseInt(event.target.getAttribute('data-index'), 10);
      setEditFormat(formats[formatIndex]);
      setEditFormatIndex(formatIndex);
      setEditModalOpen(true);
    },
    [formats],
  );

  const handleDeleteFormat = useCallback(
    async (event) => {
      const formatIndex = parseInt(event.target.getAttribute('data-index'), 10);
      try {
        const response = await csrfFetch(`/cube/${cube._id}/format/${formatIndex}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw Error();

        const json = await response.json();
        if (json.success !== 'true') throw Error();

        addAlert('success', 'Format successfully deleted.');
        setFormats(formats.filter((_, index) => index !== formatIndex));
      } catch (err) {
        console.error(err);
        addAlert('danger', 'Failed to delete format.');
      }
    },
    [addAlert, cube._id, formats],
  );

  const handleSetDefaultFormat = useCallback(
    async (event) => {
      const formatIndex = parseInt(event.target.getAttribute('data-index'), 10);
      try {
        const response = await csrfFetch(`/cube/${cube.shortID}/defaultformat/${formatIndex}`, {
          method: 'PUT',
        });

        if (!response.ok) throw Error();

        const json = await response.json();
        if (json.success !== 'true') throw Error();
        addAlert('success', 'Format successfully set as default.');
        setDefaultDraftFormat(formatIndex);
      } catch (err) {
        console.error(err);
        addAlert('danger', 'Failed to set format as default.');
      }
    },
    [addAlert, cube.shortID],
  );

  // Sort formats alphabetically.
  const formatsSorted = useMemo(
    () =>
      formats
        .map((format, index) => ({ ...format, index }))
        .sort((a, b) => {
          if (a.index === defaultDraftFormat) {
            return -1;
          }
          if (b.index === defaultDraftFormat) {
            return 1;
          }
          return a.title.localeCompare(b.title);
        }),
    [formats, defaultDraftFormat],
  );

  const StandardDraftFormatCard = () => (
    <StandardDraftCard
      className="mb-3"
      onSetDefaultFormat={handleSetDefaultFormat}
      defaultDraftFormat={defaultDraftFormat}
    />
  );
  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="playtest">
        {user && cube.owner === user._id ? (
          <Navbar light expand className="usercontrols mb-3">
            <Nav navbar>
              <NavItem>
                <NavLink onClick={handleCreateFormat} className="clickable">
                  Create Custom Draft
                </NavLink>
              </NavItem>
              <NavItem>
                <UploadDecklistModalLink className="clickable">Upload Decklist</UploadDecklistModalLink>
              </NavItem>
            </Nav>
          </Navbar>
        ) : (
          <Row className="mb-3" />
        )}
        <DynamicFlash />
        <Alerts alerts={alerts} />
        <Row className="justify-content-center">
          <Col xs="12" md="6" xl="6">
            {defaultDraftFormat === -1 && <StandardDraftFormatCard />}
            {formatsSorted.map((format) => (
              <CustomDraftCard
                key={format._id}
                format={format}
                onDeleteFormat={handleDeleteFormat}
                onSetDefaultFormat={handleSetDefaultFormat}
                onEditFormat={handleEditFormat}
                defaultDraftFormat={defaultDraftFormat}
                className="mb-3"
              />
            ))}
            {defaultDraftFormat !== -1 && <StandardDraftFormatCard />}
            <GridCard className="mb-3" />
          </Col>
          <Col xs="12" md="6" xl="6">
            {decks.length !== 0 && <DecksCard decks={decks} className="mb-3" />}
            <SamplePackCard className="mb-3" />
          </Col>
        </Row>
        <Suspense>
          <CustomDraftFormatModal
            isOpen={editModalOpen}
            toggle={toggleEditModal}
            formatIndex={editFormatIndex}
            format={editFormat}
            setFormat={setEditFormat}
          />
        </Suspense>
      </CubeLayout>
    </MainLayout>
  );
};

CubePlaytestPage.propTypes = {
  cube: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.object),
    defaultDraftFormat: PropTypes.number,
    _id: PropTypes.string.isRequired,
    shortID: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    draft_formats: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        multiples: PropTypes.bool,
        markdown: PropTypes.string.isRequired,
        defaultSeats: PropTypes.number,
        packs: PropTypes.arrayOf(
          PropTypes.shape({
            slots: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            steps: PropTypes.arrayOf(
              PropTypes.shape({
                action: PropTypes.oneOf(['pass', 'pick', 'trash', 'pickrandom', 'trashrandom']),
                amount: PropTypes.number,
              }),
            ),
          }).isRequired,
        ).isRequired,
      }).isRequired,
    ),
  }).isRequired,
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  loginCallback: PropTypes.string,
};

CubePlaytestPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubePlaytestPage);
