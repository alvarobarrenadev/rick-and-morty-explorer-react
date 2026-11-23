import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const src = (path = '') => resolve(import.meta.dirname, 'src', path)

// https://vite.dev/config/
export default defineConfig({
  // Nombre del repositorio en GitHub Pages
  base: '/rick-and-morty-explorer-react/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': src(),
      // Alias específicos para Sass
      '@sass': src('sass'),
      '@abstracts': src('sass/abstracts'),
      '@base': src('sass/base'),
      '@components': src('sass/components'),
      '@layout': src('sass/layout'),
      '@pages': src('sass/pages'),
      '@themes': src('sass/themes'),
      '@vendors': src('sass/vendors'),
    },
  },
  css: {
    devSourcemap: true, // Facilita la depuración de Sass
  },
})
