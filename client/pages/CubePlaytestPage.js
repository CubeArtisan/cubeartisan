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
import {
  Box,
  Button,
  Collapse,
  Divider,
  InputLabel,
  Grid,
  Modal,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import CSRFForm from '@cubeartisan/client/components/utils/CSRFForm.js';
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
import LabeledSelect from '@cubeartisan/client/components/LabeledSelect.js';
import {
  LayoutContainer,
  ContainerHeader,
  ContainerBody,
  ContainerFooter,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';

const DeckPreview = lazy(() => import('@cubeartisan/client/components/DeckPreview.js'));
const CustomDraftFormatModal = lazy(() => import('@cubeartisan/client/components/modals/CustomDraftFormatModal.js'));

const range = (lo, hi) => Array.from(Array(hi - lo).keys(), (n) => n + lo);

const UploadDecklistModal = ({ isOpen, toggle }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Modal open={isOpen} onClose={toggle} aria-labelledby="uploadDecklistModalTitle">
      <CSRFForm method="POST" action={`/cube/${cubeID}/playtest/deck/import/plaintext`}>
        <Typography variant="h4" id="uploadDecklistModalTitle" sx={{ padding: 2, marginBottom: 1 }}>
          Upload Decklist
        </Typography>
        <Typography variant="body1">
          Acceptable formats are: one card name per line, or one card name per line prepended with #x, such as &quot;2x
          island&quot;
        </Typography>
        <TextField
          rows={10}
          multiline
          label="Your Decklist"
          placeholder="Paste Decklist Here (max length 20000)"
          name="body"
        />
        <Divider sx={{ marginY: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <Button color="success" type="submit">
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </Box>
      </CSRFForm>
    </Modal>
  );
};
UploadDecklistModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
const UploadDecklistModalLink = withModal(Button, UploadDecklistModal);

const useBotsOnlyCallback = (botsOnly, cubeID) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const { mtgmlServer } = useContext(SiteCustomizationContext);
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

        const response2 = await csrfFetch(`/draft/${draft._id}/submit/0?skipDeckbuilder=1`, { method: 'POST' });
        const json2 = await response2.json();
        console.debug(json2.url);
        window.location.href = json2.url;
      }
    },
    [botsOnly, cubeID, formRef, mtgmlServer],
  );

  return [submitForm, formRef, loading];
};

const CustomDraftCard = ({ format, onEditFormat, onDeleteFormat, onSetDefaultFormat, defaultDraftFormat }) => {
  const { cubeID, canEdit } = useContext(CubeContext);
  const { index } = format;
  const [botsOnly, toggleBotsOnly] = useToggle(false);
  const [submitForm, formRef, loading] = useBotsOnlyCallback(botsOnly, cubeID);
  const [seats, setSeats] = useState(`${format.defaultSeats ?? 8}`);
  const [humanSeats, setHumanSeats] = useState('1');
  const [timeout, setTimeout] = useState('0');
  const [collapseOpen, setCollapseOpen] = useState(false);
  return (
    <CSRFForm
      method="POST"
      key="createDraft"
      action={`/cube/${cubeID}/playtest/draft`}
      ref={formRef}
      onSubmit={submitForm}
    >
      <LayoutContainer sx={{ marginBottom: 2 }}>
        <ContainerHeader
          title={`${defaultDraftFormat === index ? 'Default Format: ' : ''}${format.title} (Custom Draft)`}
          variant="h5"
        />
        <ContainerBody>
          <Markdown markdown={format.markdown} />
          <LabeledSelect
            baseId={`seats-${index}`}
            value={seats}
            setValue={setSeats}
            values={range(2, 17)}
            label="Total Seats:"
            name="seats"
          />
          <LabeledSelect
            baseId={`human-seats-${index}`}
            value={humanSeats}
            setValue={setHumanSeats}
            values={range(1, seats)}
            label=" Seats:"
            name="humanSeats"
          />
          <LabeledSelect
            baseId={`timeout-${index}`}
            value={timeout}
            setValue={setTimeout}
            values={range(0, 31)}
            label="Timer: Seconds Per Card In Pack (Use 0 to disable timer)."
            name="timeout"
          />
          <Box sx={{ display: 'flex' }}>
            <InputLabel id={`bots-only-${index}-label`}>Have just bots draft:</InputLabel>
            <Switch
              id={`bots-only-${index}-switch`}
              checked={botsOnly}
              onChange={toggleBotsOnly}
              sx={{ marginLeft: 2 }}
            />
          </Box>
          <input type="hidden" name="id" value={index} />
        </ContainerBody>
        <ContainerFooter>
          <Box sx={{ display: 'flex' }}>
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
                <Button color="warning" id={`deleteToggler-${index}`} onClick={() => setCollapseOpen(true)}>
                  Delete
                </Button>
              </>
            )}
          </Box>
          <Collapse in={collapseOpen}>
            <Typography variant="h6" sx={{ marginY: 2 }}>
              Are you sure? This action cannot be undone.
            </Typography>
            <Button color="warning" onClick={onDeleteFormat} data-index={index}>
              Yes, delete this format
            </Button>
          </Collapse>
        </ContainerFooter>
      </LayoutContainer>
    </CSRFForm>
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
  const [seats, setSeats] = useState('8');
  const [humanSeats, setHumanSeats] = useState('1');
  const [timeout, setTimeout] = useState('0');
  const [cards, setCards] = useState('15');
  const [packs, setPacks] = useState('3');
  return (
    <CSRFForm method="POST" action={`/cube/${cubeID}/playtest/draft`} onSubmit={submitForm} ref={formRef}>
      <LayoutContainer sx={{ marginBottom: 2 }}>
        <ContainerHeader variant="h5" title={`${defaultDraftFormat === -1 ? 'Default Format: ' : ''}Standard Draft`} />
        <ContainerBody>
          <LabeledSelect
            baseId="packs-standard"
            value={packs}
            setValue={setPacks}
            values={range(1, 16)}
            label="Number of Packs:"
            name="packs"
          />
          <LabeledSelect
            baseId="cards-standard"
            value={cards}
            setValue={setCards}
            values={range(1, 25)}
            label="Cards per Pack:"
            name="cards"
          />
          <LabeledSelect
            baseId="seats-standard"
            value={seats}
            setValue={setSeats}
            values={range(2, 17)}
            label="Total Seats:"
            name="seats"
          />
          <LabeledSelect
            baseId="human-seats-standard"
            value={humanSeats}
            setValue={setHumanSeats}
            values={range(1, seats)}
            label=" Seats:"
            name="humanSeats"
          />
          <LabeledSelect
            baseId="timeout-standard"
            value={timeout}
            setValue={setTimeout}
            values={range(0, 31)}
            label="Timer: Seconds Per Card In Pack (Use 0 to disable timer)."
            name="timeout"
          />
          <Box sx={{ display: 'flex' }}>
            <InputLabel id="bots-only-standard-label">Have just bots draft.</InputLabel>
            <Switch
              id="bots-only-standard-switch"
              checked={botsOnly}
              onChange={toggleBotsOnly}
              sx={{ marginLeft: 2 }}
            />
          </Box>
          <input type="hidden" name="id" value="-1" />
        </ContainerBody>
        <ContainerFooter sx={{ display: 'flex' }}>
          <LoadingButton color="success" variant="contained" loading={loading} type="submit">
            Start Draft
          </LoadingButton>
          {canEdit && defaultDraftFormat !== -1 && (
            <Button color="success" onClick={onSetDefaultFormat} data-index={-1}>
              Make Default
            </Button>
          )}
        </ContainerFooter>
      </LayoutContainer>
    </CSRFForm>
  );
};
StandardDraftCard.propTypes = {
  onSetDefaultFormat: PropTypes.func.isRequired,
  defaultDraftFormat: PropTypes.number.isRequired,
};

const TYPES_VALUES = ['Against Bot', '2 Player Local'];
const TYPES_KEYS = ['bot', '2playerlocal'];

const GridCard = () => {
  const { cubeID } = useContext(CubeContext);
  const [packs, setPacks] = useState('18');
  const [type, setType] = useState('bot');
  return (
    <CSRFForm method="POST" action={`/cube/${cubeID}/playtest/griddraft`}>
      <LayoutContainer sx={{}}>
        <ContainerHeader variant="h5" title="Grid Draft" />
        <ContainerBody>
          <Typography variant="subtitle1">
            Grid drafting is a strategic 2 player draft with completely open information.
          </Typography>
          <LabeledSelect
            baseId="packs-grid"
            value={packs}
            setValue={setPacks}
            values={range(1, 30)}
            label="Number of Packs:"
            name="packs"
          />
          <LabeledSelect
            baseId="type-grid"
            value={type}
            setValue={setType}
            values={TYPES_VALUES}
            keys={TYPES_KEYS}
            label="Type of Grid Draft"
            name="type"
          />
        </ContainerBody>
        <ContainerFooter>
          <Button color="success" type="submit" variant="contained">
            Start Draft
          </Button>
        </ContainerFooter>
      </LayoutContainer>
    </CSRFForm>
  );
};

const DecksCard = ({ decks }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <LayoutContainer sx={{ marginBottom: 2 }}>
      <ContainerHeader variant="h5" title="Recent Decks" />
      <ContainerBody>
        <Suspense>
          {decks.map((deck) => (
            <DeckPreview key={deck._id} deck={deck} />
          ))}
        </Suspense>
      </ContainerBody>
      <ContainerFooter>
        <Button href={`/cube/${cubeID}/playtest/decks`}>View all</Button>
      </ContainerFooter>
    </LayoutContainer>
  );
};
DecksCard.propTypes = {
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
};

const SamplePackCard = () => {
  const { cubeID } = useContext(CubeContext);
  const [seed, setSeed] = useState('');
  const handleChange = useCallback((event) => setSeed(event.target.value), []);
  return (
    <LayoutContainer sx={{ marginBottom: 2 }}>
      <ContainerHeader title="View Sample Pack" variant="h5" />
      <ContainerBody>
        <InputLabel htmlFor="sample-seed-text" id="sample-seed-label">
          Seed (the same seed will give the same pack unless the cube is changed)
        </InputLabel>
        <TextField id="sample-seed-text" label="Seed" name="seed" value={seed} onChange={handleChange} />
      </ContainerBody>
      <ContainerFooter sx={{ display: 'flex' }}>
        <Button color="success" href={`/cube/${cubeID}/playtest/sample`}>
          View With Random Seed
        </Button>
        <Button color="success" disabled={!seed} href={`/cube/${cubeID}/playtest/sample/${seed}`}>
          View Seeded
        </Button>
      </ContainerFooter>
    </LayoutContainer>
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

  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="playtest">
        {user && cube.owner === user._id && (
          <Toolbar sx={{ backgroundColor: 'background.paper', marginBottom: 1, borderRadius: '0 0 2rem 2rem' }}>
            <Button onClick={handleCreateFormat}>Create Custom Draft</Button>
            <UploadDecklistModalLink modalProps={{}}>Upload Decklist</UploadDecklistModalLink>
          </Toolbar>
        )}
        <DynamicFlash />
        <Alerts alerts={alerts} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
            {defaultDraftFormat === -1 && (
              <StandardDraftCard onSetDefaultFormat={handleSetDefaultFormat} defaultDraftFormat={defaultDraftFormat} />
            )}
            {formatsSorted.map((format) => (
              <CustomDraftCard
                key={format._id}
                format={format}
                onDeleteFormat={handleDeleteFormat}
                onSetDefaultFormat={handleSetDefaultFormat}
                onEditFormat={handleEditFormat}
                defaultDraftFormat={defaultDraftFormat}
              />
            ))}
            {defaultDraftFormat !== -1 && (
              <StandardDraftCard onSetDefaultFormat={handleSetDefaultFormat} defaultDraftFormat={defaultDraftFormat} />
            )}
            <GridCard />
          </Grid>
          <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
            {decks.length !== 0 && <DecksCard decks={decks} />}
            <SamplePackCard />
          </Grid>
        </Grid>
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
    cards: PropTypes.arrayOf(CardPropType),
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
