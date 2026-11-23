import { getCharactersByIds, getEpisodeById } from '@/api/rickAndMortyApi.jsx'
import { useAsync } from '@/hooks/useAsync.jsx'
import { extractIdFromUrl, formatDate } from '@/utils/formatters.jsx'
import EmptyState from './EmptyState.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import Loader from './Loader.jsx'
import MiniCharacterCard from './MiniCharacterCard.jsx'

// Detalle de un episodio con el grid de personajes que aparecen en él
export default function EpisodeDetail({ id }) {
  const { status, data: episode, error, retry } = useAsync(
    (signal) => getEpisodeById(id, { signal }),
    id,
  )

  if (status === 'loading') return <Loader label="Cargando episodio…" />
  if (status === 'error') {
    return <ErrorMessage title="No se pudo cargar el episodio" message={error} onRetry={retry} />
  }

  return (
    <div className="episode-detail">
      <div className="episode-detail__head">
        <span className="episode-detail__code">{episode.episode}</span>
        <h3 className="episode-detail__name">{episode.name}</h3>
        <p className="episode-detail__meta">Emisión: {formatDate(episode.air_date)}</p>
        <p className="episode-detail__meta">Personajes que aparecen: {episode.characters?.length ?? 0}</p>
      </div>

      <section className="episode-detail__characters">
        <h4>Personajes</h4>
        <EpisodeCharacters urls={episode.characters || []} />
      </section>
    </div>
  )
}

// Carga los personajes del episodio a partir de sus URLs y los muestra como mini-cards
function EpisodeCharacters({ urls }) {
  const ids = urls.map(extractIdFromUrl).filter(Boolean)
  const { status, data: characters, retry } = useAsync(
    (signal) => getCharactersByIds(ids, { signal }),
    ids.join(','),
  )

  if (!ids.length) {
    return <EmptyState title="Sin personajes" message="Este episodio no tiene personajes." />
  }
  if (status === 'loading') return <Loader label="Cargando personajes…" />
  if (status === 'error') {
    return <ErrorMessage title="No se pudieron cargar los personajes" message="Inténtalo más tarde." onRetry={retry} />
  }

  return (
    <div className="mini-grid">
      {characters.map((c) => (
        <MiniCharacterCard key={c.id} character={c} />
      ))}
    </div>
  )
}
