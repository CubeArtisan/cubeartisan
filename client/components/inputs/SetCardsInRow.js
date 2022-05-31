import { Button, Grid, NativeSelect } from '@mui/material';
import React, { useContext } from 'react';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

const range = (lo, hi) => Array.from(Array(hi - lo).keys(), (n) => n + lo);
const rangeOptions = (lo, hi) =>
  range(lo, hi).map((n) => (
    <option key={n} value={n}>
      {n}
    </option>
  ));

const SetCardsInRow = () => {
  const { cardsInRow, setCardsInRow } = useContext(DisplayContext);
  // Subcomponents are in the reversed order because that causes them to be right aligned.
  return (
    <Grid item xs>
      <Grid container direction="row-reverse">
        <Grid item xs="auto">
          <Button variant={cardsInRow === 3 ? 'contained' : 'outlined'} onClick={() => setCardsInRow(3)}>
            Large
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button variant={cardsInRow === 5 ? 'contained' : 'outlined'} onClick={() => setCardsInRow(5)}>
            Medium
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button variant={cardsInRow === 8 ? 'contained' : 'outlined'} onClick={() => setCardsInRow(8)}>
            Small
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button variant={cardsInRow === 10 ? 'contained' : 'outlined'} onClick={() => setCardsInRow(10)}>
            Extra-Small
          </Button>
        </Grid>
        <Grid item xs="auto">
          <NativeSelect
            value={cardsInRow}
            onChange={(event) => setCardsInRow(event.target.value)}
            id="set-cards-in-row-select"
            sx={{ border: '1px solid primary.main' }}
          >
            {rangeOptions(1, 33, setCardsInRow)}
          </NativeSelect>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SetCardsInRow;
