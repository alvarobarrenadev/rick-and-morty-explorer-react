import { Link } from 'react-router-dom'
import CharacterCard from '@/components/CharacterCard.jsx'
import EmptyState from '@/components/EmptyState.jsx'
import { useFavorites } from '@/context/FavoritesContext.jsx'

// Personajes guardados en localStorage. Se actualiza sola al cambiar el contexto de favoritos
export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className="page page--favorites">
      <header className="page__header">
        <h1 className="page__title">Favoritos</h1>
        <p className="page__subtitle">Tus personajes guardados localmente.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="page__empty">
          <EmptyState
            title="Aún no tienes favoritos"
            message="Marca personajes con la estrella para guardarlos aquí."
            action={
              <Link to="/characters" className="btn btn--primary">
                Explorar personajes
              </Link>
            }
          />
        </div>
      ) : (
        <div className="card-grid">
          {favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </section>
  )
}
