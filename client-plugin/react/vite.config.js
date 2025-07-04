import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared-components'),
    },
  },
  build: {
  outDir: '../wordpress-plugin/build',
  emptyOutDir: true,
      rollupOptions: {
        input:path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'assets/index.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/index.css'
          }
          return 'assets/[name][extname]'
        },
      },
    },
  },
})
