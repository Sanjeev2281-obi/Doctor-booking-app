import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme:{
    extend:{
      color:{
        primary:"#5f6FFF",
      }
    },
     build: {
    rollupOptions: {
      external: ['react-router-dom']
    }
  }
  }
})
