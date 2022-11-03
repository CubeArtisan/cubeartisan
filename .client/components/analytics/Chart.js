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
import { Typography, useTheme } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';

import AsfanDropdown from '@cubeartisan/client/components/AsfanDropdown.js';
import LabeledSelect from '@cubeartisan/client/components/inputs/LabeledSelect.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { sortIntoGroups, SORTS } from '@cubeartisan/client/utils/Sort.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const colorMap = {
  White: '#D8CEAB',
  Blue: '#67A6D3',
  Black: '#8C7A91',
  Red: '#D85F69',
  Green: '#6AB572',
  Colorless: '#ADADAD',
  Gold: '#DBC467',
};
const colors = [...Object.values(colorMap), '#000000'];
const getColor = (label, index) => colorMap[label] ?? colors[index % colors.length];

const Chart = ({ cards, characteristics, setAsfans, cube, defaultFormatId }) => {
  const [sort, setSort] = useQueryParam('sort', 'Color Identity');
  const [characteristic, setCharacteristic] = useQueryParam('field', 'Mana Value');
  const { palette } = useTheme();

  const groups = sortIntoGroups(cards, sort);

  const options = {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        grid: { color: palette.grey['500'] },
        title: {
          display: true,
          labelString: characteristic,
        },
        ticks: {
          color: palette.text.primary,
        },
      },
      y: {
        display: true,
        grid: { color: palette.grey['500'] },
        title: {
          display: true,
          labelString: 'Count',
        },
        ticks: {
          color: palette.text.primary,
        },
      },
    },
  };

  const labels = useMemo(
    () => characteristics[characteristic].labels(cards, characteristic),
    [characteristic, characteristics, cards],
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: Object.keys(groups).map((key, index) => ({
        label: key,
        data: labels.map((label) =>
          groups[key]
            .filter((card) => characteristics[characteristic].cardIsLabel(card, label))
            .reduce((acc, card) => acc + card.asfan, 0),
        ),
        backgroundColor: getColor(key, index),
      })),
    }),
    [labels, characteristic, characteristics, groups],
  );

  return (
    <>
      <Typography variant="h4" key="title">
        Chart
      </Typography>
      <Typography variant="subtitle1" key="subtitle">
        View the counts of a characteristic on a chart. For unstacked columns, use 'Unsorted'.
      </Typography>
      <LabeledSelect baseId="chart-group" label="Group By:" values={SORTS} value={sort} setValue={setSort} />
      <LabeledSelect
        baseId="chart-characteristic"
        label="Characteristic:"
        values={Object.keys(characteristics)}
        value={characteristic}
        setValue={setCharacteristic}
      />
      <AsfanDropdown cube={cube} defaultFormatId={defaultFormatId} setAsfans={setAsfans} />
      <ReactChart type="bar" options={options} data={data} />
    </>
  );
};
Chart.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  characteristics: PropTypes.shape({}).isRequired,
  cube: CubePropType.isRequired,
  defaultFormatId: PropTypes.number,
  setAsfans: PropTypes.func.isRequired,
};
Chart.defaultProps = {
  defaultFormatId: null,
};

export default Chart;
