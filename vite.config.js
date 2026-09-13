// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.MP4', '**/*.WEBP', '**/*.OGG'],
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});
