import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],


  server: {
    proxy: {
      '/auth': {
        target: 'http://10.2.4.16:5454', // Backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '/auth')
      }
    }
  }
})
