import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src'
    }
  },
  server: {
    host: '0.0.0.0', // Add this line
    port: 5173, // Explicitly set port
    strictPort: true, // Don't try other ports
    hmr: {
      clientPort: 0 // Force HMR to use same port
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    },
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate"
    }
  }
})