import { useCallback, useEffect, useRef } from 'react'
import { ApiError } from '@/api/rickAndMortyApi.jsx'
import { useExplorer } from '@/context/ExplorerContext.jsx'

// Lógica común de las vistas paginadas (personajes y episodios)
// - Carga la primera página cada vez que cambian los parámetros
// - "Cargar más" pide la siguiente página y la añade a la lista
// - Guarda el resultado en ExplorerContext para no repetir la petición al volver a la sección
//
// status: idle | loading | loading-more | ready | empty | error
export function usePaginatedList(cacheKey, fetcher, params) {
  const { lists, updateList } = useExplorer()
  const list = lists[cacheKey]

  // Los parámetros se serializan para poder compararlos y usarlos como dependencia
  const paramsKey = JSON.stringify(params)

  // Controlador de la petición en vuelo, permite cancelarla si cambian los filtros o se sale de la vista
  const controllerRef = useRef(null)

  const update = useCallback((patch) => updateList(cacheKey, patch), [updateList, cacheKey])

  // Carga la primera página con los parámetros actuales, cancelando cualquier petición anterior
  const loadFirstPage = useCallback(async () => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    update({
      results: [],
      info: null,
      page: 1,
      status: 'loading',
      error: null,
      loadMoreError: null,
      paramsKey,
    })

    try {
      const data = await fetcher({ ...JSON.parse(paramsKey), page: 1 }, { signal: controller.signal })
      const results = data.results || []
      update({
        results,
        info: data.info || null,
        // Si la API devuelve lista vacía, el estado pasa a 'empty' para mostrar el mensaje
        status: results.length ? 'ready' : 'empty',
      })
    } catch (error) {
      if (error.name === 'AbortError') return
      update({
        status: 'error',
        error: error instanceof ApiError ? error.message : 'Error inesperado.',
      })
    }
  }, [fetcher, paramsKey, update])

  // Carga la siguiente página y la concatena a los resultados que ya había
  const loadMore = useCallback(async () => {
    if (!list.info?.next || list.status === 'loading-more') return
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    const nextPage = list.page + 1
    update({ status: 'loading-more', loadMoreError: null })

    try {
      const data = await fetcher({ ...JSON.parse(paramsKey), page: nextPage }, { signal: controller.signal })
      update((prev) => ({
        results: [...prev.results, ...(data.results || [])],
        info: data.info || null,
        page: nextPage,
        status: 'ready',
      }))
    } catch (error) {
      // Si se cancela (por ejemplo al salir de la sección) se conserva lo que ya estaba cargado
      if (error.name === 'AbortError') {
        update({ status: 'ready' })
        return
      }
      update({
        status: 'ready',
        loadMoreError: error instanceof ApiError ? error.message : 'Error inesperado.',
      })
    }
  }, [fetcher, paramsKey, list.info, list.page, list.status, update])

  // Cada vez que cambian los parámetros se recarga desde la primera página
  // Si ya hay datos en caché para estos mismos parámetros, se reutilizan sin pedirlos otra vez
  const isCached = list.paramsKey === paramsKey && (list.status === 'ready' || list.status === 'empty')
  useEffect(() => {
    if (!isCached) loadFirstPage()
    // Al desmontar la vista se cancela la petición pendiente (equivale al teardown del router JS)
    return () => controllerRef.current?.abort()
    // isCached solo se evalúa al cambiar los parámetros, no en cada actualización de la lista
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey])

  return { ...list, loadMore, retry: loadFirstPage }
}
