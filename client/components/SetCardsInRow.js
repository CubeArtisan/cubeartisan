import React, { useContext } from 'react';
import { Button, Grid, InputLabel, NativeSelect } from '@mui/material';

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
  return (
    <>
          <Grid item xs="auto">
      <Button active={cardsInRow === 3} onClick={() => setCardsInRow(3)}>
        Large
      </Button>
      </Grid>
          <Grid item xs="auto">
      <Button active={cardsInRow === 5} onClick={() => setCardsInRow(5)}>
        Medium
      </Button>
      </Grid>
          <Grid item xs="auto">
      <Button active={cardsInRow === 8} onClick={() => setCardsInRow(8)}>
        Small
      </Button>
      </Grid>
          <Grid item xs="auto">
      <Button active={cardsInRow === 10} onClick={() => setCardsInRow(10)}>
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
    </>
  );
};
export default SetCardsInRow;
