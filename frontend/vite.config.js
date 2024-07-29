import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Set the test environment to jsdom
    globals: true, // Enable global variables for testing
    exclude: [...configDefaults.exclude, 'node_modules/**'], // Exclude node_modules from tests
  },
  base: '/',
});
