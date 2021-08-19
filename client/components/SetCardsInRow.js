import React, { useContext } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledButtonDropdown,
} from 'reactstrap';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

const range = (lo, hi) => Array.from(Array(hi - lo).keys(), (n) => n + lo);
const rangeOptions = (lo, hi, onClick) =>
  range(lo, hi).map((n) => (
    <DropdownItem key={n} onClick={() => onClick(n)}>
      {n}
    </DropdownItem>
  ));

const SetCardsInRow = () => {
  const { cardsInRow, setCardsInRow } = useContext(DisplayContext);
  return (
    <Pagination>
      <PaginationItem active={cardsInRow === 3}>
        <PaginationLink onClick={() => setCardsInRow(3)}>Large</PaginationLink>
      </PaginationItem>
      <PaginationItem active={cardsInRow === 5}>
        <PaginationLink onClick={() => setCardsInRow(5)}>Medium</PaginationLink>
      </PaginationItem>
      <PaginationItem active={cardsInRow === 8}>
        <PaginationLink onClick={() => setCardsInRow(8)}>Small</PaginationLink>
      </PaginationItem>
      <PaginationItem active={cardsInRow === 10}>
        <PaginationLink onClick={() => setCardsInRow(10)}>Extra-Small</PaginationLink>
      </PaginationItem>
      <PaginationItem active={![3, 5, 8, 10].includes(cardsInRow)}>
        <UncontrolledButtonDropdown>
          <DropdownToggle caret>{cardsInRow}</DropdownToggle>
          <DropdownMenu>{rangeOptions(1, 33, setCardsInRow)}</DropdownMenu>
        </UncontrolledButtonDropdown>
      </PaginationItem>
    </Pagination>
  );
};
export default SetCardsInRow;
