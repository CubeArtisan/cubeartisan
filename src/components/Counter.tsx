import { createSignal } from 'solid-js';
import '@cubeartisan/cubeartisan/components/Counter.module.css';

const Counter = () => {
  const [count, setCount] = createSignal(0);
  return (
    <button class="increment" onClick={() => setCount(count() + 1)}>
      Clicks: {count()}
    </button>
  );
};

export default Counter;
