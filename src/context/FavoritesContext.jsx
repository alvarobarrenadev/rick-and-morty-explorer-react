import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readJSON, writeJSON } from '@/utils/storage.jsx'

// Clave usada para guardar y leer los favoritos en localStorage
const FAVORITES_KEY = 'favorites-characters'

const FavoritesContext = createContext(null)

// Crea una copia plana del personaje con solo los campos necesarios para renderizar la card
// Así no se pierde información si el personaje cambia en la API en el futuro
function snapshotCharacter(c) {
  return {
    id: c.id,
    name: c.name,
    image: c.image,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin ? { name: c.origin.name } : { name: 'Desconocido' },
    location: c.location ? { name: c.location.name } : { name: 'Desconocida' },
    created: c.created,
    episode: c.episode || [],
    type: c.type || '',
    url: c.url,
  }
}

export function FavoritesProvider({ children }) {
  // Los favoritos se recuperan de localStorage al iniciar para persistir entre sesiones
  const [favorites, setFavorites] = useState(() => readJSON(FAVORITES_KEY, []))

  // Cada vez que cambia la lista se guarda en localStorage
  useEffect(() => {
    writeJSON(FAVORITES_KEY, favorites)
  }, [favorites])

  const isFavorite = useCallback((id) => favorites.some((fav) => fav.id === id), [favorites])

  // Añade o elimina un personaje de favoritos
  // Los nuevos se añaden al principio para que aparezcan primero en la vista
  const toggleFavorite = useCallback((character) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === character.id)
        ? prev.filter((fav) => fav.id !== character.id)
        : [snapshotCharacter(character), ...prev],
    )
  }, [])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

// El hook se exporta junto al Provider: patrón habitual de los contextos
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>')
  return context
}
