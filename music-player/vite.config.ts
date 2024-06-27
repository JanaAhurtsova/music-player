import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@components': path.resolve('./src/components'),
      '@assets': path.resolve('./src/assets'),
      '@utils': path.resolve('./src/utils'),
    },
  },
});
