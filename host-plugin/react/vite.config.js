import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
},
})
