import { getEpisodes } from '@/api/rickAndMortyApi.jsx'
import EpisodeCard from '@/components/EpisodeCard.jsx'
import ListStatus from '@/components/ListStatus.jsx'
import LoadMore from '@/components/LoadMore.jsx'
import { usePaginatedList } from '@/hooks/usePaginatedList.jsx'

const LABELS = {
  loading: 'Cargando episodios…',
  errorTitle: 'No pudimos cargar los episodios',
  emptyTitle: 'Sin episodios',
  emptyMessage: 'No encontramos episodios.',
}

// Objeto constante para que los parámetros no cambien entre renders
const NO_PARAMS = {}

export default function EpisodesPage() {
  const list = usePaginatedList('episodes', getEpisodes, NO_PARAMS)

  return (
    <section className="page page--episodes">
      <header className="page__header">
        <h1 className="page__title">Episodios</h1>
        <p className="page__subtitle">Todos los episodios del multiverso.</p>
      </header>

      <ListStatus status={list.status} error={list.error} onRetry={list.retry} labels={LABELS} />

      <div className="card-grid card-grid--episodes">
        {list.results.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      <LoadMore status={list.status} info={list.info} error={list.loadMoreError} onLoadMore={list.loadMore} />
    </section>
  )
}
