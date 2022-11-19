import path from 'path';

import solid from 'solid-start/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@cubeartisan/next': path.resolve(__dirname, './src/'),
    },
  },
  test: {
    deps: {
      registerNodeLoader: true,
    },
    globals: true,
    isolate: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect'],
    transformMode: { web: [/\.[jt]sx$/] },
  },
});
