import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '@/context/ModalContext.jsx'
import CharacterDetail from './CharacterDetail.jsx'
import EpisodeDetail from './EpisodeDetail.jsx'

// Modal de detalle. Se monta en <body> con un portal
// Accesibilidad: role="dialog", cierre con Esc y clic fuera, foco al abrir y foco devuelto al cerrar
export default function Modal() {
  const { modal, closeModal } = useModal()
  if (!modal) return null
  return createPortal(<Dialog modal={modal} onClose={closeModal} />, document.body)
}

function Dialog({ modal, onClose }) {
  const dialogRef = useRef(null)

  // Solo se ejecuta al abrir/cerrar: cambiar de personaje a episodio dentro del modal no lo reinicia
  useEffect(() => {
    // Guarda el elemento que tenía el foco para devolvérselo al cerrar
    const previouslyFocused = document.activeElement
    dialogRef.current?.focus()
    // Bloquea el scroll del body mientras el modal está abierto
    document.body.classList.add('is-modal-open')

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('is-modal-open')
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  // Al cambiar el contenido (p. ej. de episodio a personaje) se vuelve al inicio del modal
  const bodyRef = useRef(null)
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [modal.type, modal.id])

  return (
    <div
      className="modal__overlay"
      onClick={(event) => {
        // Solo cierra si el clic es directamente sobre el fondo, no dentro del diálogo
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <header className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {modal.title}
          </h2>
          <button type="button" className="modal__close" aria-label="Cerrar detalle" onClick={onClose}>
            ×
          </button>
        </header>
        <div ref={bodyRef} className="modal__body">
          {/* key: reinicia el estado del detalle al cambiar de elemento */}
          {modal.type === 'character' ? (
            <CharacterDetail key={`c-${modal.id}`} id={modal.id} />
          ) : (
            <EpisodeDetail key={`e-${modal.id}`} id={modal.id} />
          )}
        </div>
      </div>
    </div>
  )
}
