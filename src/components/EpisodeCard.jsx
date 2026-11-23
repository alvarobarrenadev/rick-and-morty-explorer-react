import { useModal } from '@/context/ModalContext.jsx'
import { formatDate } from '@/utils/formatters.jsx'

// Tarjeta de episodio: código, nombre, fecha de emisión y número de personajes
export default function EpisodeCard({ episode }) {
  const { openEpisode } = useModal()
  const open = () => openEpisode(episode)

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      open()
    }
  }

  return (
    <article className="card episode-card" tabIndex={0} onClick={open} onKeyDown={handleKeyDown}>
      <div className="episode-card__code">{episode.episode}</div>
      <div className="card__body">
        <h3 className="card__title">{episode.name}</h3>
        <p className="card__meta">
          <span>Emisión: {formatDate(episode.air_date)}</span>
        </p>
        <p className="card__meta">
          <span className="pill">{episode.characters?.length ?? 0} personajes</span>
        </p>
        <div className="card__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={(event) => {
              event.stopPropagation()
              open()
            }}
          >
            Ver personajes
          </button>
        </div>
      </div>
    </article>
  )
}
