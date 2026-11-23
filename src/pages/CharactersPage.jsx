import { useMemo } from 'react'
import { getCharacters } from '@/api/rickAndMortyApi.jsx'
import CharacterCard from '@/components/CharacterCard.jsx'
import FiltersBar from '@/components/FiltersBar.jsx'
import ListStatus from '@/components/ListStatus.jsx'
import LoadMore from '@/components/LoadMore.jsx'
import { useExplorer } from '@/context/ExplorerContext.jsx'
import { useDebounce } from '@/hooks/useDebounce.jsx'
import { usePaginatedList } from '@/hooks/usePaginatedList.jsx'

const LABELS = {
  loading: 'Cargando personajes…',
  errorTitle: 'No pudimos cargar los personajes',
  emptyTitle: 'Sin resultados',
  emptyMessage: 'No se encontraron personajes con esos filtros.',
}

export default function CharactersPage() {
  // Los filtros viven en el contexto para conservarlos al cambiar de sección
  const { characterFilters: filters, setCharacterFilters } = useExplorer()

  // Los campos de texto esperan 400 ms sin cambios antes de lanzar la búsqueda; el select es inmediato
  const name = useDebounce(filters.name.trim())
  const species = useDebounce(filters.species.trim())
  const params = useMemo(() => ({ name, status: filters.status, species }), [name, filters.status, species])

  const list = usePaginatedList('characters', getCharacters, params)

  return (
    <section className="page page--characters">
      <header className="page__header">
        <h1 className="page__title">Personajes</h1>
        <p className="page__subtitle">Explora el multiverso de Rick and Morty.</p>
      </header>

      <FiltersBar filters={filters} onChange={setCharacterFilters} />

      <ListStatus status={list.status} error={list.error} onRetry={list.retry} labels={LABELS} />

      <div className="card-grid">
        {list.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <LoadMore status={list.status} info={list.info} error={list.loadMoreError} onLoadMore={list.loadMore} />
    </section>
  )
}
