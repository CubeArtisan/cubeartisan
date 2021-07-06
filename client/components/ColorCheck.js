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
import { Fragment, useCallback } from 'react';

import { Button, ButtonGroup, FormGroup, Input, InputGroupAddon, Label } from 'reactstrap';

import { COLORS } from '../utils/Util';

export const ColorChecks = ({ prefix, values, onChange }) =>
  COLORS.map(([color, short]) => (
    <FormGroup key={short} check inline>
      <Label check>
        <ColorCheck
          key={short}
          prefix={prefix}
          color={color}
          short={short}
          value={values[`${prefix || 'color'}${short}`]}
          onChange={onChange}
        />
        <img src={`/content/symbols/${short.toLowerCase()}.png`} alt={color} title={color} />
      </Label>
    </FormGroup>
  ));

export const ColorCheckButton = ({ prefix, size, color, short, value, onChange }) => {
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      const name = prefix + short;
      onChange({
        target: { name, value: !value },
      });
      if (short === 'C' && !value) {
        for (const other of Array.from('WUBRG')) {
          onChange({
            target: {
              name: prefix + other,
              value: false,
            },
          });
        }
      } else if (Array.from('WUBRG').includes(short) && !value) {
        onChange({
          target: {
            name: `${prefix}C`,
            value: false,
          },
        });
      }
    },
    [prefix, color, short, value, onChange],
  );
  const symbolClassName = size ? `mana-symbol-${size}` : 'mana-symbol';
  return (
    <Button
      className={`color-check-button${value ? ' active' : ''}`}
      outline={!value}
      size={size}
      onClick={handleClick}
      aria-label={color}
    >
      <img src={`/content/symbols/${short.toLowerCase()}.png`} alt={color} title={color} className={symbolClassName} />
    </Button>
  );
};

export const ColorChecksControl = ({ colorless, prefix, size, values, onChange, ...props }) => {
  const colors = colorless ? [...COLORS, ['Colorless', 'C']] : COLORS;
  const style = props.style || {};
  if (size === 'sm') {
    style.height = 'calc(1.5em + .5rem + 2px)';
    style.fontSize = '0.875rem';
  }
  return (
    <ButtonGroup size={size} style={style} {...props}>
      {colors.map(([color, short]) => (
        <ColorCheckButton
          key={short}
          prefix={prefix}
          size={size}
          color={color}
          short={short}
          value={values[prefix + short]}
          onChange={onChange}
        />
      ))}
    </ButtonGroup>
  );
};

ColorChecksControl.defaultProps = {
  colorless: false,
  prefix: 'color',
};

export const ColorChecksAddon = ({ addonType, colorless, prefix, size, values, onChange }) => {
  const colors = Array.from(COLORS);
  if (colorless) {
    colors.push(['Colorless', 'C']);
  }
  return (
    <>
      {colors.map(([color, short]) => (
        <InputGroupAddon key={short} addonType={addonType}>
          <ColorCheckButton
            prefix={prefix}
            size={size}
            color={color}
            short={short}
            value={values[prefix + short]}
            onChange={onChange}
          />
        </InputGroupAddon>
      ))}
    </>
  );
};

ColorChecksAddon.defaultProps = {
  addonType: 'prepend',
  colorless: false,
  prefix: 'color',
};

const ColorCheck = ({ prefix, color, short, value, onChange }) => (
  <Input type="checkbox" name={`${prefix || 'color'}${short.toUpperCase()}`} checked={value} onChange={onChange} />
);

export default ColorCheck;
