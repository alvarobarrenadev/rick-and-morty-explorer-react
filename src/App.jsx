import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header.jsx'
import Modal from '@/components/Modal.jsx'
import { useModal } from '@/context/ModalContext.jsx'
import { useLenis } from '@/hooks/useLenis.jsx'
import CharactersPage from '@/pages/CharactersPage.jsx'
import EpisodesPage from '@/pages/EpisodesPage.jsx'
import FavoritesPage from '@/pages/FavoritesPage.jsx'

// Título de la pestaña para cada ruta
const TITLES = {
  '/characters': 'Personajes',
  '/episodes': 'Episodios',
  '/favorites': 'Favoritos',
}

export default function App() {
  const { pathname } = useLocation()
  const { isOpen, closeModal } = useModal()
  const lenisRef = useLenis(isOpen)

  // Al cambiar de sección: cierra el modal, vuelve arriba y actualiza el título de la pestaña
  useEffect(() => {
    closeModal()
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    const title = TITLES[pathname]
    document.title = title ? `${title} · Rick & Morty Explorer` : 'Rick and Morty Explorer'
  }, [pathname, closeModal, lenisRef])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        // Con HashRouter un href="#main" cambiaría la ruta: se mueve el foco a mano
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        Saltar al contenido
      </a>

      <Header />

      <main id="main" className="app" tabIndex={-1}>
        <Routes>
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* Cualquier otra ruta redirige a personajes */}
          <Route path="*" element={<Navigate to="/characters" replace />} />
        </Routes>
      </main>

      <Footer />
      <Modal />
    </>
  )
}
