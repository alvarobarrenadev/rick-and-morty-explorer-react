import { useCallback, useEffect, useState } from 'react'

// Ejecuta una función asíncrona cuando cambia `key` y expone su estado: loading | ready | error
// La función recibe un AbortSignal para cancelar la petición si el componente se desmonta
// o si `key` cambia antes de que termine
export function useAsync(asyncFn, key) {
  // Contador que se incrementa al pulsar "Reintentar" para volver a lanzar la petición
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${key}|${attempt}`

  // Cada resultado guarda la petición a la que pertenece
  const [result, setResult] = useState({ requestKey: null, status: 'loading', data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    asyncFn(controller.signal)
      .then((data) => setResult({ requestKey, status: 'ready', data, error: null }))
      .catch((error) => {
        // Una petición cancelada a propósito no es un error que haya que mostrar
        if (error.name === 'AbortError') return
        setResult({ requestKey, status: 'error', data: null, error: error.message || 'Error inesperado.' })
      })

    return () => controller.abort()
    // asyncFn se recrea en cada render; requestKey identifica cuándo hay que volver a pedir los datos
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  // Si el resultado guardado es de otra petición, la actual todavía está cargando
  if (result.requestKey !== requestKey) return { status: 'loading', data: null, error: null, retry }
  return { status: result.status, data: result.data, error: result.error, retry }
}
