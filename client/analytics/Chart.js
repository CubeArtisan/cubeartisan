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
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import ChartComponent from 'react-chartjs-2';
import { Col, Row, InputGroup, InputGroupAddon, CustomInput, InputGroupText } from 'reactstrap';

import AsfanDropdown from '@cubeartisan/client/components/AsfanDropdown';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType';
import { sortIntoGroups, SORTS } from '@cubeartisan/client/utils/Sort';

const colorMap = {
  White: '#D8CEAB',
  Blue: '#67A6D3',
  Black: '#8C7A91',
  Red: '#D85F69',
  Green: '#6AB572',
  Colorless: '#ADADAD',
  Multicolored: '#DBC467',
};
const colors = [...Object.values(colorMap), '#000000'];
const getColor = (label, index) => {
  return colorMap[label] ?? colors[index % colors.length];
};

const Chart = ({ cards, characteristics, setAsfans, cube, defaultFormatId }) => {
  const [sort, setSort] = useQueryParam('sort', 'Color Identity');
  const [characteristic, setcharacteristic] = useQueryParam('field', 'Mana Value');

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
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: characteristic,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Count',
          },
        },
      ],
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
        borderColor: getColor(key, index),
      })),
    }),
    [labels, characteristic, characteristics, groups],
  );

  return (
    <>
      <Row>
        <Col>
          <h4 className="d-lg-block d-none">Chart</h4>
          <p>View the counts of a characteristic on a chart. For unstacked columns, use 'Unsorted'.</p>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Group by: </InputGroupText>
            </InputGroupAddon>
            <CustomInput type="select" value={sort} onChange={(event) => setSort(event.target.value)}>
              {SORTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </CustomInput>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Characteristic: </InputGroupText>
            </InputGroupAddon>
            <CustomInput
              type="select"
              value={characteristic}
              onChange={(event) => setcharacteristic(event.target.value)}
            >
              {Object.keys(characteristics).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </CustomInput>
          </InputGroup>
        </Col>
      </Row>
      <AsfanDropdown cube={cube} defaultFormatId={defaultFormatId} setAsfans={setAsfans} />
      <ChartComponent options={options} data={data} type="bar" />
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
