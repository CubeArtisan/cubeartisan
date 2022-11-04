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
import {
  Button,
  Grid,
  InputLabel,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';

import LabeledSelect from '@cubeartisan/client/components/inputs/LabeledSelect.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import calculate from '@cubeartisan/client/utils/CalculateHyperGeom.js';

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement);

const LabeledTextField = ({ humanName, idBase, ...props }) => (
  <>
    <InputLabel htmlFor={`${idBase}-text`} id={`${idBase}-label`} sx={{ marginTop: 1 }}>
      {humanName}
    </InputLabel>
    <TextField id={`${idBase}-text`} label={humanName} sx={{ marginBottom: 1 }} {...props} />
  </>
);

LabeledTextField.propTypes = {
  humanName: PropTypes.string.isRequired,
  idBase: PropTypes.string.isRequired,
};

const inputs = [
  'Population size',
  'Number of successes in population',
  'Sample size',
  'Number of successes in sample (x)',
];

const HyperGeom = () => {
  const [populationSize, setPopulationSize] = useQueryParam('popSize', '40');
  const [popSuccesses, setPopSuccesses] = useQueryParam('popSuccesses', '17');
  const [sampleSize, setSampleSize] = useQueryParam('sampleSize', '7');
  const [sampleSuccesses, setSampleSuccesses] = useQueryParam('sampleSuccesses', '1');
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState('Number of successes in population');

  const [gte, setgte] = useState('');
  const [gt, setgt] = useState('');
  const [lt, setlt] = useState('');
  const [lte, setlte] = useState('');
  const [et, setet] = useState('');

  const { palette } = useTheme();

  const percentify = (num) => `${(num * 100).toFixed(2)}%`;

  const colors = Object.values(palette.tags);

  const clear = () => {
    setData([]);
  };

  const submit = (event) => {
    event?.preventDefault?.();
    try {
      const { equalTo, lessThan, lessThanEqual, greaterThan, greaterThanEqual } = calculate(
        populationSize,
        sampleSize,
        popSuccesses,
        sampleSuccesses,
      );

      setet(percentify(equalTo));
      setlt(percentify(lessThan));
      setlte(percentify(lessThanEqual));
      setgt(percentify(greaterThan));
      setgte(percentify(greaterThanEqual));
      setData(
        data.concat([
          {
            name: `Trial ${data.length + 1}`,
            sampleSuccesses: parseInt(sampleSuccesses, 10),
            populationSize: parseInt(populationSize, 10),
            popSuccesses: parseInt(popSuccesses, 10),
            sampleSize: parseInt(sampleSize, 10),
            color: colors[data.length % colors.length],
          },
        ]),
      );
    } catch (err) {
      setet(err);
      setlt(err);
      setlte(err);
      setgt(err);
      setgte(err);
    }
  };

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
        grid: { color: palette.grey['500'] },
        ticks: { color: palette.text.primary },
        display: true,
        scaleLabel: {
          display: false,
        },
      },
      y: {
        grid: { color: palette.grey['500'] },
        ticks: { color: palette.text.primary },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Probability',
        },
      },
    },
  };

  const endPoints = data.map((datapoint) => {
    switch (xAxis) {
      case inputs[0]:
        return datapoint.populationSize;
      case inputs[1]:
        return datapoint.populationSize;
      case inputs[2]:
        return datapoint.populationSize;
      case inputs[3]:
        return Math.min(parseInt(datapoint.sampleSize, 10), parseInt(datapoint.popSuccesses, 10));
      default:
        return 0;
    }
  });
  const startPoints = data.map((datapoint) => {
    switch (xAxis) {
      case inputs[0]:
        return datapoint.popSuccesses;
      case inputs[1]:
        return datapoint.sampleSuccesses;
      case inputs[2]:
        return datapoint.sampleSuccesses;
      case inputs[3]:
        return 0;
      default:
        return 0;
    }
  });
  const endPoint = endPoints.length > 0 ? Math.max(...endPoints.map((x) => x)) + 1 : 0;
  const startPoint = startPoints.length > 0 ? Math.min(...startPoints.map((x) => x)) : 0;
  const length = endPoint - startPoint;

  const plotPopSize = (dataset, start) => {
    const res = [];
    for (let i = startPoint; i < start; i++) {
      res.push(0);
    }
    for (let i = start; i < endPoint; i++) {
      res.push(calculate(i, dataset.sampleSize, dataset.popSuccesses, dataset.sampleSuccesses).greaterThanEqual);
    }
    return res;
  };
  const plotPopSuccess = (dataset, start, end) => {
    const res = [];
    for (let i = startPoint; i < start; i++) {
      res.push(0);
    }
    for (let i = start; i <= end; i++) {
      res.push(calculate(dataset.populationSize, dataset.sampleSize, i, dataset.sampleSuccesses).greaterThanEqual);
    }
    for (let i = end + 1; i < endPoint; i++) {
      res.push(0);
    }
    return res;
  };
  const plotSampleSize = (dataset, start, end) => {
    const res = [];
    for (let i = startPoint; i < start; i++) {
      res.push(0);
    }
    for (let i = 0; i <= end; i++) {
      res.push(calculate(dataset.populationSize, i, dataset.popSuccesses, dataset.sampleSuccesses).greaterThanEqual);
    }
    for (let i = end + 1; i < endPoint; i++) {
      res.push(0);
    }
    return res;
  };
  const plotSampleSuccess = (dataset, start, end) => {
    const res = [];
    for (let i = startPoint; i < start; i++) {
      res.push(0);
    }
    for (let i = 0; i <= end; i++) {
      res.push(calculate(dataset.populationSize, dataset.sampleSize, dataset.popSuccesses, i).greaterThanEqual);
    }
    for (let i = end + 1; i < endPoint; i++) {
      res.push(0);
    }
    return res;
  };

  const plotData = (dataset, start, end) => {
    switch (xAxis) {
      case inputs[0]:
        return plotPopSize(dataset, start);
      case inputs[1]:
        return plotPopSuccess(dataset, start, end);
      case inputs[2]:
        return plotSampleSize(dataset, start, end);
      case inputs[3]:
        return plotSampleSuccess(dataset, start, end);
      default:
        return [];
    }
  };

  const plotdata = {
    labels: Array.from(
      Array(length)
        .fill(0)
        .map((_, idx) => startPoint + idx),
    ),
    datasets: data.map((dataset, idx) => ({
      label: dataset.name,
      borderColor: dataset.color,
      fill: false,
      data: plotData(dataset, startPoints[idx], endPoints[idx]),
    })),
  };

  return (
    <>
      <Typography variant="h4">Hypergeometric Calculator</Typography>
      <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 2 }}>
        This Hypergeometric Calculator makes it easy to compute individual and cumulative hypergeometric probabilities.
        This can be useful to determine the probabilty to have a minimum amount of a certain type of card (e.g.
        cantrips) in a draft pool given the amount of those cards in the cube overall. Another use case is to calculate
        the probabilty of having cards of a certain type (e.g. aggro one-drops) in an opening hand of a deck, given the
        amount of those cards in the deck.
      </Typography>
      <Typography variant="body1">
        View information on how to use this tool{' '}
        <Link href="https://www.youtube.com/watch?v=lKYNtxrACRY" target="_blank" rel="noopener noreferrer">
          here
        </Link>
        .
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <LabeledTextField
            name="1"
            humanName="Population size"
            placeholder="e.g. the size of the cube"
            value={populationSize}
            onChange={(event) => setPopulationSize(event.target.value)}
          />
          <LabeledTextField
            name="2"
            humanName="Number of successes in population"
            placeholder="e.g. the amount of cards of a certain type in the cube"
            value={popSuccesses}
            onChange={(event) => setPopSuccesses(event.target.value, 10)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <LabeledTextField
            name="2"
            humanName="Sample size"
            placeholder="e.g. the amount of cards in the draft pod"
            value={sampleSize}
            onChange={(event) => setSampleSize(event.target.value, 10)}
          />
          <LabeledTextField
            humanName="Number of successes in sample (x)"
            placeholder="e.g. the amount of cards in the draft pod that should be of the type"
            value={sampleSuccesses}
            onChange={(event) => setSampleSuccesses(event.target.value, 10)}
          />
        </Grid>
      </Grid>
      <Button type="submit" color="success" onClick={submit}>
        Calculate
      </Button>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <LabeledTextField
            disabled
            idBase="hypergeom-prob-lt"
            humanName={`Cumulative Probability: P(X < ${sampleSuccesses})`}
            value={lt}
          />
          <LabeledTextField
            disabled
            idBase="hypergeom-prob-lte"
            humanName={`Cumulative Probability: P(X <= ${sampleSuccesses})`}
            value={lte}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <LabeledTextField
            disabled
            idBase="hypergeom-prob-equal"
            humanName={`Hypergeometric Probability: P(X = ${sampleSuccesses})`}
            value={et}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <LabeledTextField
            disabled
            idBase="hypergeom-prob-gte"
            humanName={`Cumulative Probability: P(X >= ${sampleSuccesses})`}
            value={gte}
          />
          <LabeledTextField
            disabled
            idBase="hypergeom-prob-gt"
            humanName={`Cumulative Probability: P(X > ${sampleSuccesses})`}
            value={gt}
          />
        </Grid>
      </Grid>
      {data.length > 0 && (
        <>
          <Typography variant="h5">Cumulative Distributions</Typography>
          <ReactChart options={options} data={plotdata} type="line" />
          <LabeledSelect idBase="hypergeom-axis" label="X-Axis:" values={inputs} value={xAxis} setValue={setXAxis} />
          <Typography variant="h5">Datasets</Typography>
          <Grid container>
            {data.map((datapoint) => (
              <Grid item xs={12} lg={6}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell colSpan="2" scope="row">
                        {datapoint.name}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell scope="col">Population size</TableCell>
                      <TableCell>{datapoint.populationSize}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="col">Number of successes in population</TableCell>
                      <TableCell>{datapoint.popSuccesses}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="col">Sample size</TableCell>
                      <TableCell>{datapoint.sampleSize}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="col">Number of successes in sample (x)</TableCell>
                      <TableCell>{datapoint.sampleSuccesses}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            ))}
          </Grid>
          <Button color="warning" onClick={clear}>
            Reset
          </Button>
        </>
      )}
    </>
  );
};

export default HyperGeom;
