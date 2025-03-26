import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Proxy requests starting with /api
        target: 'http://localhost:3005', // Your backend server
        changeOrigin: true, // Required for some backends
        secure: false,
      },
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
