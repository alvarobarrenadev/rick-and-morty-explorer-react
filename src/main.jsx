import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
// Estilos globales de Sass, procesados por Vite
import '@sass/main.scss'
import App from './App.jsx'
import { ExplorerProvider } from './context/ExplorerContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'

// HashRouter (#/characters) funciona en GitHub Pages sin configurar redirecciones en el servidor
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <FavoritesProvider>
        <ExplorerProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ExplorerProvider>
      </FavoritesProvider>
    </HashRouter>
  </StrictMode>,
)

// Service worker para la PWA (solo en producción para no interferir con el HMR de Vite)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
    })
  })
}
