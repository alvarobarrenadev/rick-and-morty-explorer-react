import { useFavorites } from '@/context/FavoritesContext.jsx'

// Botón de estrella para marcar o desmarcar un personaje como favorito
// variant="icon" → botón redondo sobre la imagen de la card
// variant="full" → botón con texto en el detalle del personaje
export default function FavoriteButton({ character, variant = 'icon' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(character.id)

  const handleClick = (event) => {
    // Evita que el clic llegue a la card y abra el detalle
    event.stopPropagation()
    toggleFavorite(character)
  }

  if (variant === 'full') {
    return (
      <button
        type="button"
        className={`btn ${favorite ? 'btn--primary' : 'btn--ghost'}`}
        aria-pressed={favorite}
        onClick={handleClick}
      >
        {favorite ? '★ Quitar de favoritos' : '☆ Añadir a favoritos'}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`btn-icon btn-fav${favorite ? ' is-active' : ''}`}
      aria-pressed={favorite}
      aria-label={
        favorite ? `Quitar a ${character.name} de favoritos` : `Añadir a ${character.name} a favoritos`
      }
      title={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      onClick={handleClick}
    >
      <span aria-hidden="true">{favorite ? '★' : '☆'}</span>
    </button>
  )
}
