import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      },
      '/thumbnails': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      },
      '/avatars': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      }
    }
  }
})
