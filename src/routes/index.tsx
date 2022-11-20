import Counter from '@cubeartisan/cubeartisan/components/Counter';
import '@cubeartisan/cubeartisan/routes/index.css';

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{' '}
        <a href="https://solidjs.com" target="_blank" rel="noreferrer">
          solidjs.com
        </a>{' '}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
