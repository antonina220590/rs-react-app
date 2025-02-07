import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    coverage: {
      reporter: ['html', 'text'],
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
  },
});

declare module 'vite' {
  interface UserConfig {
    test?: {
      coverage?: {
        reporter?: string[];
        exclude?: string[];
      };
      environment?: string;
      globals?: boolean;
      setupFiles?: string[];
    };
  }
}
