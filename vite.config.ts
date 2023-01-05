import path from 'path';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solid from 'solid-start/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solid(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@cubeartisan/cubeartisan': path.resolve(__dirname, './src/'),
    },
  },
  ssr: {
    noExternal: ['@kobalte/core'],
  },
  envDir: __dirname,
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
