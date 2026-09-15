import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@intigo-ui/web': path.resolve(__dirname, './src/index.ts'),
      '@intigo-ui/headless': path.resolve(__dirname, '../headless/src/index.ts'),
      '@intigo-ui/motion': path.resolve(__dirname, '../motion/src/index.ts'),
    },
  },
});
