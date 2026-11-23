import { getCharacterById, getEpisodesByIds } from '@/api/rickAndMortyApi.jsx'
import { useAsync } from '@/hooks/useAsync.jsx'
import { extractIdFromUrl, formatDate } from '@/utils/formatters.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import FavoriteButton from './FavoriteButton.jsx'
import Loader from './Loader.jsx'
import StatusLine from './StatusLine.jsx'

// Detalle completo de un personaje: datos, favorito y lista de episodios en los que aparece
export default function CharacterDetail({ id }) {
  const { status, data: character, error, retry } = useAsync(
    (signal) => getCharacterById(id, { signal }),
    id,
  )

  if (status === 'loading') return <Loader label="Cargando detalle…" />
  if (status === 'error') {
    return <ErrorMessage title="No se pudo cargar el personaje" message={error} onRetry={retry} />
  }

  const rows = [
    ['Tipo', character.type || '-'],
    ['Género', character.gender || '-'],
    ['Origen', character.origin?.name || '-'],
    ['Ubicación actual', character.location?.name || '-'],
    ['Creado en la API', formatDate(character.created)],
    ['Episodios totales', String(character.episode?.length ?? 0)],
  ]

  return (
    <div className="character-detail">
      <div className="character-detail__media">
        <img src={character.image} alt={`Retrato de ${character.name}`} width="300" height="300" />
        <div className="character-detail__actions">
          <FavoriteButton character={character} variant="full" />
        </div>
      </div>

      <div className="character-detail__info">
        <h3 className="character-detail__name">{character.name}</h3>
        <StatusLine character={character} className="character-detail__status" />

        <dl className="character-detail__list">
          {rows.map(([label, value]) => (
            <div key={label} className="character-detail__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <section className="character-detail__episodes">
          <h4>Aparece en</h4>
          <EpisodesList urls={character.episode || []} />
        </section>
      </div>
    </div>
  )
}

// Lista de episodios del personaje. La API devuelve URLs; se convierten a ids y se piden en una sola llamada
function EpisodesList({ urls }) {
  const ids = urls.map(extractIdFromUrl).filter(Boolean)
  const { status, data: episodes } = useAsync(
    (signal) => getEpisodesByIds(ids, { signal }),
    ids.join(','),
  )

  return (
    <ul className="episodes-list">
      {!ids.length && <li className="episodes-list__empty">Sin episodios.</li>}
      {ids.length > 0 && status === 'loading' && (
        <li className="episodes-list__loading">
          <Loader label="Cargando episodios…" />
        </li>
      )}
      {status === 'error' && <li className="episodes-list__error">No se pudieron cargar los episodios.</li>}
      {status === 'ready' &&
        episodes.map((ep) => (
          <li key={ep.id} className="episodes-list__item">
            <span className="episodes-list__code">{ep.episode}</span>
            <span className="episodes-list__name">{ep.name}</span>
            <span className="episodes-list__date">{formatDate(ep.air_date)}</span>
          </li>
        ))}
    </ul>
  )
}
