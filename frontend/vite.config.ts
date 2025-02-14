import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src'
    }
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate"
    }
  }

});