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
import { Box, Button, Collapse, Grid, InputLabel, Modal, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';

import {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import { AutocompleteTagField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import ColorChecksControl from '@cubeartisan/client/components/inputs/ColorCheck.js';
import LabeledSelect from '@cubeartisan/client/components/inputs/LabeledSelect.js';
import { makeFilter } from '@cubeartisan/client/filtering/FilterCards.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import { CARD_CATEGORY_DETECTORS } from '@cubeartisan/client/utils/Card.js';

const allFields = [
  'name',
  'oracle',
  'mv',
  'mana',
  'type',
  'set',
  'tag',
  'status',
  'finish',
  'price',
  'priceFoil',
  'priceEur',
  'priceTix',
  'elo',
  'power',
  'toughness',
  'loyalty',
  'rarity',
  'legality',
  'artist',
  'is',
];
const numFields = [
  'mv',
  'price',
  'priceFoil',
  'priceEur',
  'priceTix',
  'elo',
  'power',
  'toughness',
  'loyalty',
  'rarity',
  'legality',
];
const colorFields = ['color', 'identity'];

const AdvancedFilterModal = ({ isOpen, toggle, apply, values, onChange, cubeID }) => (
  <Modal open={isOpen} onClose={toggle} sx={{ width: '60%' }}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      <LayoutContainer>
        <ContainerHeader title="Advanced Filters" variant="h4" />
        <ContainerBody>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <TextField
              name="name"
              label="Card Name"
              placeholder={'Any words in the name, e.g. "Fire"'}
              value={values.name}
              onChange={(value) => onChange({ target: { name: 'name', value } })}
            />
            <TextField
              name="oracle"
              label="Oracle Text"
              placeholder={'Any text, e.g. "Draw a card"'}
              value={values.oracle}
              onChange={(value) => onChange({ target: { name: 'oracle', value } })}
            />
            <TextField
              name="mv"
              label="Mana Value"
              placeholder={'Any value, e.g. "2"'}
              value={values.cmc}
              valueOp={values.cmcOp}
              onChange={(value) => onChange({ target: { name: 'mv', value } })}
            />
          </Box>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <LabeledSelect
              baseId="colorOp"
              name="colorOp"
              label="Color"
              value={values.colorOp}
              setValue={(value) => onChange({ target: { name: 'colorOp', value } })}
              values={['Exactly these colors', 'Including these colors', 'At most these colors']}
              keys={['=', '>=', '<=']}
              selectSx={{ marginRight: 1 }}
            />
            <ColorChecksControl colorless prefix="color" values={values} onChange={onChange} />
          </Box>
          <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
            <LabeledSelect
              baseId="identityOp"
              label="Color Identity"
              name="identityOp"
              value={values.identityOp}
              setValue={(value) => onChange({ target: { name: 'identityOp', value } })}
              values={['Exactly these colors', 'Including these colors', 'At most these colors']}
              keys={['=', '>=', '<=']}
              selectSx={{ marginRight: 1 }}
            />
            <ColorChecksControl colorless prefix="identity" values={values} onChange={onChange} />
          </Box>
          <TextField
            name="mana"
            label="Mana Cost"
            placeholder={'Any mana cost, e.g. "{1}{W}"'}
            value={values.mana}
            onChange={(value) => onChange({ target: { name: 'mana', value } })}
            sx={{ marginBottom: 2 }}
          />
          <LabeledSelect
            baseId="is-filter"
            label="Card Category"
            name="is"
            value={values.is}
            setValue={(value) => onChange({ target: { name: 'is', value } })}
            values={Object.keys(CARD_CATEGORY_DETECTORS)}
            selectSx={{ marginBottom: 2 }}
          />
          <TextField
            name="type"
            label="Type Line"
            placeholder="Choose any card type, supertype, or subtypes to match"
            value={values.type}
            onChange={(value) => onChange({ target: { name: 'type', value } })}
            sx={{ marginBottom: 2, width: '12rem' }}
          />
          <TextField
            name="set"
            label="Set"
            placeholder={'Any set code, e.g. "WAR"'}
            value={values.set}
            onChange={(value) => onChange({ target: { name: 'set', value } })}
            sx={{ marginBottom: 2, width: '7rem' }}
          />
          {cubeID && (
            <Box sx={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
              <InputLabel>Tag</InputLabel>
              <AutocompleteTagField
                InputProps={{ name: 'tag', placeholder: 'Any text, e.g. "Zombie Testing"' }}
                onInputChange={(_, value) => onChange({ target: { name: 'tag', value } })}
                noButton
              />
            </Box>
          )}
          <Grid container sx={{ marginBottom: 2 }}>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <LabeledSelect
                baseId="status"
                label="Status"
                value={values.status}
                values={['', 'Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied']}
                setValue={(value) => onChange({ target: { name: 'status', value } })}
                selectSx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <LabeledSelect
                baseId="finish"
                label="Finish"
                value={values.finish}
                values={['', 'Foil', 'Non-foil']}
                setValue={(value) => onChange({ target: { name: 'finish', value } })}
                selectSx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="price"
                label="Price USD"
                placeholder={'Any decimal number, e.g. "3.50"'}
                value={values.price}
                valueOp={values.priceOp}
                onChange={(value) => onChange({ target: { name: 'price', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="priceFoil"
                label="Price USD Foil"
                placeholder={'Any decimal number, e.g. "14.00"'}
                value={values.priceFoil}
                valueOp={values.priceFoilOp}
                onChange={(value) => onChange({ target: { name: 'priceFoil', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="priceEur"
                label="Price EUR"
                placeholder={'Any decimal number, e.g. "14.00"'}
                value={values.priceEur}
                valueOp={values.priceEurOp}
                onChange={(value) => onChange({ target: { name: 'priceEur', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="priceTix"
                label="MTGO TIX"
                placeholder={'Any decimal number, e.g. "14.00"'}
                value={values.priceTix}
                valueOp={values.priceTixOp}
                onChange={(value) => onChange({ target: { name: 'priceTix', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="elo"
                label="Elo"
                placeholder={'Any integer number, e.g. "1200"'}
                value={values.elo}
                valueOp={values.eloOp}
                onChange={(value) => onChange({ target: { name: 'elo', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="power"
                label="Power"
                placeholder={'Any value, e.g. "2"'}
                value={values.power}
                valueOp={values.powerOp}
                onChange={(value) => onChange({ target: { name: 'power', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="toughness"
                label="Toughness"
                placeholder={'Any value, e.g. "2"'}
                value={values.toughness}
                valueOp={values.toughnessOp}
                onChange={(value) => onChange({ target: { name: 'toughness', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="loyalty"
                label="Loyalty"
                placeholder={'Any value, e.g. "3"'}
                value={values.loyalty}
                valueOp={values.loyaltyOp}
                onChange={(value) => onChange({ target: { name: 'loyalty', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="rarity"
                label="Rarity"
                placeholder={'Any rarity, e.g. "common"'}
                value={values.rarity}
                valueOp={values.rarityOp}
                onChange={(value) => onChange({ target: { name: 'rarity', value } })}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <LabeledSelect
                baseId="legalityOp"
                name="legalityOp"
                label="Legality"
                value={values.legalityOp}
                values={['Legal', 'Not Legal']}
                keys={['=', '!=']}
                setValue={(value) => onChange({ target: { name: 'legalityOp', value } })}
                selectSx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingX: 1 }}>
              <TextField
                name="artist"
                label="Artist"
                placeholder={'Any text, e.g. "seb"'}
                value={values.artist}
                onChange={onChange}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
        </ContainerBody>
        <ContainerFooter sx={{ display: 'flex' }}>
          <Button color="warning" aria-label="Close" onClick={toggle} variant="contained" sx={{ marginLeft: 'auto' }}>
            Cancel
          </Button>
          <Button color="success" type="submit" variant="contained" sx={{ marginX: 2 }}>
            Apply
          </Button>
        </ContainerFooter>
      </LayoutContainer>
    </form>
  </Modal>
);
AdvancedFilterModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    oracle: PropTypes.string,
    cmc: PropTypes.string,
    cmcOp: PropTypes.string,
    color: PropTypes.arrayOf(PropTypes.string.isRequired),
    colorOp: PropTypes.string,
    identity: PropTypes.arrayOf(PropTypes.string.isRequired),
    identityOp: PropTypes.string,
    is: PropTypes.string,
    mana: PropTypes.string,
    type: PropTypes.string,
    set: PropTypes.string,
    tag: PropTypes.string,
    status: PropTypes.string,
    finish: PropTypes.string,
    price: PropTypes.string,
    priceOp: PropTypes.string,
    priceFoil: PropTypes.string,
    priceFoilOp: PropTypes.string,
    priceEur: PropTypes.string,
    priceEurOp: PropTypes.string,
    priceTix: PropTypes.string,
    priceTixOp: PropTypes.string,
    elo: PropTypes.string,
    eloOp: PropTypes.string,
    power: PropTypes.string,
    powerOp: PropTypes.string,
    toughness: PropTypes.string,
    toughnessOp: PropTypes.string,
    loyalty: PropTypes.string,
    loyaltyOp: PropTypes.string,
    rarity: PropTypes.string,
    rarityOp: PropTypes.string,
    legalityOp: PropTypes.string,
    legality: PropTypes.string,
    artist: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  cubeID: PropTypes.string,
};
AdvancedFilterModal.defaultProps = {
  isOpen: false,
  cubeID: null,
};

const FilterCollapse = ({ filter, setFilter, numCards, numShown, defaultFilterText, noCount, isOpen }) => {
  const [advancedOpen, toggleAdvancedOpen, , closeAdvanced] = useToggle(false);
  const [filterInput, setFilterInput] = useQueryParam('filter', defaultFilterText ?? '');
  const [values, setValues] = useState({
    ...Object.fromEntries(allFields.map((n) => [n, ''])),
    ...Object.fromEntries(numFields.map((n) => [`${n}Op`, '='])),
    ...Object.fromEntries(colorFields.map((n) => [`${n}Op`, '='])),
    ...Object.fromEntries(colorFields.flatMap((n) => Array.from('WUBRG', (c) => [n + c, false]))),
    typeQuick: '',
    cmcQuick: '',
    cmcQuickOp: '<=',
    textQuick: '',
  });

  const cube = useContext(CubeContext);
  const cubeID = cube?.cubeID;

  const updateFilter = useCallback(
    async (filterValue) => {
      filterValue = filterValue ?? '';
      if (filterValue !== (filter?.stringify ?? '')) {
        if (filterValue === '') {
          setFilter(null);
        } else {
          const { filter: newFilter, err } = makeFilter(filterValue);
          if (err) {
            console.error(err);
          } else {
            setFilter(() => newFilter);
          }
        }
      }
    },
    [filter?.stringify, setFilter],
  );

  useEffect(() => {
    updateFilter(filterInput);
    // Disable since this is the proper way to ensure it only runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyAdvanced = async () => {
    // Advanced Filter change. Render to filter input.
    const tokens = [];
    for (const name of allFields) {
      if (values[name]) {
        const op = numFields.includes(name) ? values[`${name}Op`] || '=' : ':';
        let value = values[name].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        if (value.indexOf(' ') > -1) {
          value = `"${value}"`;
        }
        tokens.push(`${name}${op}${value}`);
      }
    }
    for (const name of colorFields) {
      const colors = [];
      const op = values[`${name}Op`] || '=';
      for (const color of Array.from('WUBRG')) {
        if (values[name + color]) {
          colors.push(color);
        }
      }
      if (colors.length > 0) {
        tokens.push(`${name}${op}${colors.join('')}`);
      }
    }
    const advancedFilterInput = tokens.join(' ');
    closeAdvanced();
    setFilterInput(advancedFilterInput);
    updateFilter(advancedFilterInput);
  };

  const applyQuick = async (event) => {
    event.preventDefault();
    const tokens = [];
    if (values.cmcQuick) {
      tokens.push(`mv${values.cmcQuickOp}${values.cmcQuick}`);
    }
    if (values.typeQuick) {
      if (values.typeQuick.includes(' ')) {
        tokens.push(`type:"${values.typeQuick.replace(/"/g, '\\""')}"`);
      } else {
        tokens.push(`type:${values.typeQuick}`);
      }
    }
    if (values.textQuick) {
      if (values.textQuick.includes(' ')) {
        tokens.push(`text:"${values.textQuick.replace(/"/g, '\\""')}"`);
      } else {
        tokens.push(`type:${values.textQuick}`);
      }
    }
    const quickFilterInput = tokens.join(' ');
    setFilterInput(quickFilterInput);
    return updateFilter(quickFilterInput);
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = ['checkbox', 'radio'].includes(target.type) ? target.checked : target.value;
    const { name } = target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  };

  const changeFilterInput = (event) => setFilterInput(event.target.value);

  const apply = (event) => {
    event.preventDefault();
    return updateFilter(filterInput);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 /* ENTER */) {
      return apply(event);
    }
    return Promise.resolve(null);
  };

  const reset = () => {
    setFilterInput('');
    return updateFilter('');
  };

  const { err } = makeFilter(filterInput);
  const valid = !err;
  if (err) {
    console.warn('Error parsing', err);
  }
  const appliedText = `Filters applied${typeof numCards !== 'undefined' ? `: ${numCards} cards` : ''}${
    typeof numShown !== 'undefined' ? `, ${numShown} shown` : ''
  }.`;
  let filterInputColor = 'primary';
  if (filterInput.length > 0) {
    if (valid) filterInputColor = 'success';
    else filterInputColor = 'error';
  }
  return (
    <Collapse in={isOpen} sx={{ backgroundColor: 'background.paper', paddingX: 2 }}>
      <Box sx={{ display: 'flex', marginBottom: 1 }}>
        <TextField
          id="filterInput"
          name="filterInput"
          placeholder={'name:"Ambush Viper"'}
          color={filterInputColor}
          value={filterInput}
          onChange={changeFilterInput}
          onKeyDown={handleKeyDown}
          sx={{ width: '60%', marginLeft: 'auto', marginRight: 1 }}
        />
        <Button
          color="success"
          variant="contained"
          disabled={!valid}
          onClick={apply}
          sx={{ paddingX: 2, marginRight: 'auto' }}
        >
          Apply
        </Button>
      </Box>
      <Grid container sx={{ margin: '0, 5' }}>
        <Grid item sx={{ padding: 2 }} xs="auto">
          <ColorChecksControl colorless prefix="colorQuick" values={values} onChange={handleChange} />
        </Grid>
        <Grid item sx={{ padding: 2 }} xs="auto">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LabeledSelect
              baseId="cmcQuickOp"
              name="cmcQuickOp"
              label="Mana Value"
              value={values.cmcQuickOp}
              setValue={(value) => handleChange({ target: { name: 'cmcQuickOp', value } })}
              values={['>', '>=', '=', '<=', '<']}
            />
            <TextField
              name="cmcQuick"
              id="cmcQuick"
              label="MV"
              value={values.cmcQuick}
              onChange={handleChange}
              sx={{ marginLeft: 1, maxWidth: '4rem' }}
            />
          </Box>
        </Grid>
        <Grid item sx={{ padding: 2 }} xs="auto">
          <TextField
            name="typeQuick"
            id="typeQuick"
            label="Type"
            value={values.typeQuick}
            onChange={handleChange}
            sx={{ width: '12rem' }}
          />
        </Grid>
        <Grid item sx={{ padding: 2 }} xs="auto">
          <TextField
            name="textQuick"
            id="textQuick"
            label="Oracle Text"
            value={values.textQuick}
            onChange={handleChange}
            sx={{ width: '20rem' }}
          />
        </Grid>
        <Grid item sx={{ paddingY: 2 }} xs="auto">
          <Button type="submit" onClick={applyQuick} color="success" variant="contained">
            Quick Filter
          </Button>
        </Grid>
      </Grid>
      {!noCount && <p>{!filter || filter.length === 0 ? <em>No filters applied.</em> : <em>{appliedText}</em>}</p>}
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <Button color="warning" variant="outlined" onClick={reset} sx={{ marginX: 1 }}>
          Reset Filters
        </Button>
        <Button color="primary" variant="outlined" onClick={toggleAdvancedOpen} sx={{ marginX: 1 }}>
          Advanced...
        </Button>
        <Button color="secondary" variant="outlined" href="/filters" sx={{ marginX: 1 }}>
          Syntax Guide
        </Button>
      </Box>
      <AdvancedFilterModal
        isOpen={advancedOpen}
        toggle={toggleAdvancedOpen}
        apply={applyAdvanced}
        values={values}
        onChange={handleChange}
        cubeID={cubeID}
      />
    </Collapse>
  );
};
FilterCollapse.propTypes = {
  filter: PropTypes.func,
  setFilter: PropTypes.func.isRequired,
  numCards: PropTypes.number,
  numShown: PropTypes.number,
  defaultFilterText: PropTypes.string,
  noCount: PropTypes.bool,
  isOpen: PropTypes.bool,
};
FilterCollapse.defaultProps = {
  filter: null,
  numCards: 0,
  numShown: 0,
  defaultFilterText: null,
  noCount: false,
  isOpen: false,
};
export default FilterCollapse;
