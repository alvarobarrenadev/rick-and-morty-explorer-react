import { useModal } from '@/context/ModalContext.jsx'

// Tarjeta compacta de personaje usada en el detalle de un episodio
// Al pulsarla se abre el detalle de ese personaje en el mismo modal
export default function MiniCharacterCard({ character }) {
  const { openCharacter } = useModal()

  return (
    <button
      type="button"
      className="mini-card"
      onClick={() => openCharacter(character)}
      aria-label={`Ver detalle de ${character.name}`}
    >
      {/* alt vacío: el nombre ya se muestra justo debajo */}
      <img src={character.image} alt="" loading="lazy" width="64" height="64" />
      <span className="mini-card__name">{character.name}</span>
    </button>
  )
}
