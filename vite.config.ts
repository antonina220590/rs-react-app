import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      reporter: ['html', 'text'],
      include: ['**/*.tsx'],
      exclude: [
        'node_modules/',
        'dist',
        '.vite',
        'vite.config.ts',
        'postcss.config.js',
        'tailwind.config.ts',
        'eslint.config.js',
        'vite-env.d.ts',
      ],
    },
    environment: 'jsdom',
    setupFiles: ['./src/test/test.ts'],
    testTimeout: 30000,
  },
});
