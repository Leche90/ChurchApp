import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src' // Changed from './src' to '/src'
    }
  },
  // Add this base configuration
  base: './', // Critical for correct asset paths in production
  
  // Production-specific build settings
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clears dist folder before build
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: undefined // Prevents unexpected chunk splitting
      }
    }
  },
  
  // Development-only settings (Vercel ignores these in production)
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 0
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})