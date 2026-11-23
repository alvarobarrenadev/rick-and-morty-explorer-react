import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Contexto del modal de detalle. Solo puede haber un modal abierto a la vez:
// abrir uno nuevo (por ejemplo, un personaje desde el detalle de un episodio) sustituye al anterior
const ModalContext = createContext(null)

// Acepta el objeto completo o solo su id numérico, como en el proyecto JS
function toEntry(type, itemOrId, fallbackTitle) {
  const isObject = typeof itemOrId === 'object' && itemOrId !== null
  return {
    type,
    id: isObject ? itemOrId.id : Number(itemOrId),
    title: isObject ? itemOrId.name : fallbackTitle,
  }
}

export function ModalProvider({ children }) {
  // null cuando no hay modal; si no, { type: 'character' | 'episode', id, title }
  const [modal, setModal] = useState(null)

  const openCharacter = useCallback((c) => setModal(toEntry('character', c, 'Personaje')), [])
  const openEpisode = useCallback((e) => setModal(toEntry('episode', e, 'Episodio')), [])
  const closeModal = useCallback(() => setModal(null), [])

  const value = useMemo(
    () => ({ modal, isOpen: modal !== null, openCharacter, openEpisode, closeModal }),
    [modal, openCharacter, openEpisode, closeModal],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

// El hook se exporta junto al Provider: patrón habitual de los contextos
// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal debe usarse dentro de <ModalProvider>')
  return context
}
