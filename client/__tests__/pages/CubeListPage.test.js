import { FetchMock } from '@react-mock/fetch';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CubeListPage from '@cubeartisan/client/pages/CubeListPage.js';
import { fromEntries } from '@cubeartisan/client/utils/Util.js';
import exampleCube from '@cubeartisan/client/__tests__/fixtures/examplecube.js';
import exampleCardsFull from '@cubeartisan/client/__tests__/fixtures/examplecardsdetails.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';

jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => undefined);

process.env.DEBUG_PRINT_LIMIT = 100000;

const cube = {
  ...exampleCube,
  cards: exampleCardsFull,
  maybe: exampleCardsFull,
  default_sorts: ['Color Category', 'Types-Multicolor'],
};

const element = () => (
  <FetchMock
    mocks={[
      { matcher: '/cards/names', response: { success: 'true' } },
      { matcher: '/cube/1/cards/names', response: { success: 'true' } },
      {
        matcher: '/cards/versions',
        response: {
          success: 'true',
          dict: fromEntries(
            exampleCardsFull.map((card) => [
              card.cardID,
              [
                {
                  id: card.cardID,
                  version: card.details.full_name
                    .toUpperCase()
                    .substring(card.details.full_name.indexOf('[') + 1, card.details.full_name.indexOf(']')),
                  img: card.details.image_normal,
                },
              ],
            ]),
          ),
        },
      },
    ]}
  >
    <UserContext.Provider value={{ _id: '1234', notifications: [] }}>
      <CubeListPage
        cube={cube}
        maybe={exampleCardsFull}
        defaultView="table"
        defaultFilterText=""
        defaultTagColors={[]}
        defaultShowTagColors
        defaultPrimarySort=""
        defaultSecondarySort=""
        user={{
          id: '5d671c495c4dcdeca1a2f7c8',
          username: 'sensitiveemmett',
          notifications: [],
        }}
      />
    </UserContext.Provider>
  </FetchMock>
);

test('CubeListPage has major functionality', async () => {
  const { findByDisplayValue, findByText, getAllByText, getByDisplayValue, getByText } = render(element());

  expect(getByText(exampleCardsFull[0].details.name));

  // The tests in this file should be integration tests for the whole CubeListPage thing.
  // Test View
  const viewSelect = await findByDisplayValue('Table View');
  for (const view of ['table', 'curve']) {
    fireEvent.change(viewSelect, { target: { value: view } });
    // eslint-disable-next-line no-await-in-loop
    expect(await findByText(exampleCardsFull[0].details.name));
  }

  fireEvent.change(viewSelect, { target: { value: 'table' } });
  await findByText(exampleCardsFull[0].details.name);

  // Test Sort Collapse: can we change the sort?
  fireEvent.click(getByText('Sort'));
  await findByText('Primary Sort');
  fireEvent.change(getByDisplayValue('Color Category'), { target: { value: 'Color Identity' } });
  fireEvent.change(getByDisplayValue('Types-Multicolor'), { target: { value: 'Unsorted' } });

  for (const card of exampleCardsFull) {
    expect(getAllByText(card.details.name).length).toBeGreaterThan(0);
  }
});

test('CubeListPage supports modal and new window card triggers', async () => {
  const { findByAltText, findByText, getByText } = render(element());

  const cardName = exampleCardsFull[0].details.name;
  // Show modal card dialog
  fireEvent.click(getByText(cardName));
  expect(await findByAltText(cardName));
  // Close dialog
  fireEvent.click(global.document.querySelector('.close[aria-label="Close"]'));
  await findByText(cardName);

  // Open new window if ctrl pressed
  global.open = jest.fn();
  fireEvent.click(getByText(cardName), { ctrlKey: true });
  expect(global.open).toBeCalled();
});
