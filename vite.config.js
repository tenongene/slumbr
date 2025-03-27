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
      
    // },
    // proxy: {
    //   '/api': { // Proxy requests starting with /api
    //     target: 'https://slumbr-lambda-1071299687549.us-central1.run.app', // Your backend server
    //     changeOrigin: true, // Required for some backends
    //     secure: false,
    //   },

    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
