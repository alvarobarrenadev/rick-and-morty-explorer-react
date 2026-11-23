import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { EMPTY_FILTERS } from '@/utils/filters.jsx'

// Contexto que guarda las listas cargadas y los filtros de personajes
// Equivale al store de state.js del proyecto en JS: al volver a una sección
// se recuperan sus resultados y filtros sin volver a llamar a la API


const INITIAL_LIST = {
  results: [],
  info: null, // objeto info de la API con next, prev, count, pages
  page: 1,
  status: 'idle', // idle | loading | loading-more | ready | empty | error
  error: null,
  loadMoreError: null,
  paramsKey: null, // parámetros con los que se cargó la lista
}

const ExplorerContext = createContext(null)

export function ExplorerProvider({ children }) {
  const [lists, setLists] = useState({
    characters: INITIAL_LIST,
    episodes: INITIAL_LIST,
  })
  const [characterFilters, setCharacterFilters] = useState(EMPTY_FILTERS)

  // Aplica un patch parcial sobre una lista. El patch puede ser un objeto o una función (prev) => objeto
  const updateList = useCallback((key, patch) => {
    setLists((prev) => {
      const current = prev[key] ?? INITIAL_LIST
      const next = typeof patch === 'function' ? patch(current) : patch
      return { ...prev, [key]: { ...current, ...next } }
    })
  }, [])

  const value = useMemo(
    () => ({ lists, updateList, characterFilters, setCharacterFilters }),
    [lists, updateList, characterFilters],
  )

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>
}

// El hook se exporta junto al Provider: patrón habitual de los contextos
// eslint-disable-next-line react-refresh/only-export-components
export function useExplorer() {
  const context = useContext(ExplorerContext)
  if (!context) throw new Error('useExplorer debe usarse dentro de <ExplorerProvider>')
  return context
}
