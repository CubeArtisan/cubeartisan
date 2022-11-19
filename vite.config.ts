import path from 'path';

import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@cubeartisan/next': path.resolve(__dirname, './src/'),
    },
  },
  test: {
    css: {
      include: /.+/,
    },
    deps: {
      inline: [/solid-testing-library/],
      registerNodeLoader: true,
    },
    globals: true,
    isolate: true,
    root: '.',
  },
});
