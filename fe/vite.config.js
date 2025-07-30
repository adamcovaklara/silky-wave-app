import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react()],
  // for local development
  // server: {
  //  proxy: {
  //    '/api': 'http://localhost:3000'  // in Vercel don't need this
  //  }
  //},
  build: {
    outDir: "dist",  // <-- this must match vercel.json config
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
