import { useEffect, useState } from 'react'

// Devuelve el valor recibido, pero solo cuando han pasado `delay` ms sin que cambie
// Se usa en el buscador para no lanzar una petición a la API en cada pulsación de tecla
// Si el valor queda vacío (por ejemplo al pulsar "Limpiar filtros") se aplica al instante
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Vaciar el campo no necesita esperar: se aplica en el siguiente tick
    const timer = setTimeout(() => setDebounced(value), value === '' ? 0 : delay)
    // Si el valor cambia antes de que termine el retardo, se cancela el timer anterior
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
