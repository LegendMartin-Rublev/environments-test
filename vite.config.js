import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isExtension = mode === 'extension'
  
  return {
    plugins: [vue(), tailwindcss()],
    base: isExtension ? './' : '/environments-test/',
    build: {
      outDir: isExtension ? 'extension' : 'dist',
      emptyOutDir: true,
    },
  }
})
