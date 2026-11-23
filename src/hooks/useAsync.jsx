import { useCallback, useEffect, useState } from 'react'

// Ejecuta una función asíncrona cuando cambia `key` y expone su estado: loading | ready | error
// La función recibe un AbortSignal para cancelar la petición si el componente se desmonta
// o si `key` cambia antes de que termine
export function useAsync(asyncFn, key) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null })
  // Contador que se incrementa al pulsar "Reintentar" para volver a lanzar el efecto
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', data: null, error: null })

    asyncFn(controller.signal)
      .then((data) => setState({ status: 'ready', data, error: null }))
      .catch((error) => {
        // Una petición cancelada a propósito no es un error que haya que mostrar
        if (error.name === 'AbortError') return
        setState({ status: 'error', data: null, error: error.message || 'Error inesperado.' })
      })

    return () => controller.abort()
    // asyncFn se recrea en cada render; `key` identifica cuándo hay que volver a pedir los datos
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { ...state, retry }
}
