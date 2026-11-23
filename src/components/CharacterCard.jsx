import { useModal } from '@/context/ModalContext.jsx'
import FavoriteButton from './FavoriteButton.jsx'
import StatusLine from './StatusLine.jsx'

// Tarjeta de personaje para el grid: imagen, datos básicos, favorito y botón de detalle
export default function CharacterCard({ character }) {
  const { openCharacter } = useModal()
  const open = () => openCharacter(character)

  // Enter y espacio abren el detalle para usuarios de teclado
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      open()
    }
  }

  return (
    <article className="card character-card" tabIndex={0} onClick={open} onKeyDown={handleKeyDown}>
      <div className="card__media">
        <img src={character.image} alt={`Retrato de ${character.name}`} loading="lazy" width="300" height="300" />
        <FavoriteButton character={character} />
      </div>

      <div className="card__body">
        <h3 className="card__title">{character.name}</h3>
        <StatusLine character={character} className="card__meta" />

        <dl className="card__list">
          <div>
            <dt>Género</dt>
            <dd>{character.gender || '—'}</dd>
          </div>
          <div>
            <dt>Origen</dt>
            <dd>{character.origin?.name || '—'}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>{character.location?.name || '—'}</dd>
          </div>
        </dl>

        <div className="card__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={(event) => {
              event.stopPropagation()
              open()
            }}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  )
}
