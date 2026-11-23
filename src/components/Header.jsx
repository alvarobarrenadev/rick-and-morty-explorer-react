import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '@/context/FavoritesContext.jsx'

const BRAND_LOGO = `${import.meta.env.BASE_URL}favicon.svg`

// Cabecera fija con la marca y la navegación principal
// NavLink añade la clase .active y aria-current="page" al enlace de la ruta actual
export default function Header() {
  const { favorites } = useFavorites()
  const count = favorites.length

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/characters" className="brand" aria-label="Rick and Morty Explorer — Inicio">
          <img className="brand__mark" src={BRAND_LOGO} alt="" aria-hidden="true" width="36" height="36" />
          <span className="brand__text">
            Rick &amp; Morty <em>Explorer</em>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          <ul className="main-nav__list">
            <li>
              <NavLink className="main-nav__link" to="/characters">
                Personajes
              </NavLink>
            </li>
            <li>
              <NavLink className="main-nav__link" to="/episodes">
                Episodios
              </NavLink>
            </li>
            <li>
              <NavLink className="main-nav__link" to="/favorites">
                Favoritos
                <span className={`badge${count === 0 ? ' badge--zero' : ''}`} aria-label={`${count} personajes en favoritos`}>
                  {count}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
