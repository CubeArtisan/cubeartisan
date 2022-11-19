import { createSignal } from 'solid-js';
import '@cubeartisan/next/components/Counter.module.css';

const Counter = () => {
  const [count, setCount] = createSignal(0);
  return (
    <button class="increment" onClick={() => setCount(count() + 1)} role="button">
      Clicks: {count()}
    </button>
  );
};

export default Counter;
