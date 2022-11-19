/**
 * @vitest-environment jsdom
 */
// import { fireEvent, render } from '@solidjs/testing-library';
import { fireEvent, render } from 'solid-testing-library';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';

import Counter from '@cubeartisan/next/components/Counter';

describe('<Counter />', () => {
  it('increments value', async ({ expect }) => {
    const result = render(() => <Counter />);
    const { queryByRole, unmount } = result;
    const button = queryByRole<HTMLButtonElement>('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Clicks: 0/);
    fireEvent.click(button!);
    expect(button).toHaveTextContent(/Clicks: 1/);
    unmount();
  });

  it('renders 1', ({ expect }) => {
    const { container, unmount } = render(() => <Counter />);
    expect(container).toMatchSnapshot();
    unmount();
  });
});
