# Rick and Morty Explorer · React

Aplicación web que consume la [Rick and Morty API](https://rickandmortyapi.com/) para explorar personajes y episodios de la serie. Es la versión en React de [rick-and-morty-explorer](https://github.com/alvarobarrenadev/rick-and-morty-explorer) (vanilla JS), con la misma funcionalidad y el mismo diseño.

## Funcionalidades

- **Personajes**: listado con búsqueda por nombre (con debounce), filtro por estado y especie, y botón "Limpiar filtros".
- **Detalle de personaje** en un modal: tipo, género, origen, ubicación, fecha de creación y lista de episodios.
- **Episodios**: listado con fecha de emisión y número de personajes. El detalle muestra los personajes del episodio y enlaza al detalle de cada uno.
- **Paginación** con el botón "Cargar más".
- **Favoritos** guardados en `localStorage`, con un contador en el menú y una página propia.
- **Estados de carga y error**: spinner, mensajes de lista vacía y errores de red con botón "Reintentar".
- **Responsive**: grid de 1, 2, 3 o 4 columnas según el ancho de pantalla.
- Accesibilidad: navegación por teclado en las cards, modal que se cierra con Esc y devuelve el foco, y `aria-live` en los estados.
- Extras: scroll suave con Lenis y PWA instalable (manifest y service worker).

## Stack

- React 19 + Vite
- React Router (`HashRouter`)
- Sass con arquitectura 7-1 (`src/sass`)
- Context API para el estado global (favoritos, caché de listas y modal)

## Estructura

```
src/
  api/          cliente de la API (fetch, errores y paginación)
  components/   cards, filtros, modal, loader, mensajes…
  context/      FavoritesContext, ExplorerContext y ModalContext
  hooks/        usePaginatedList, useAsync, useDebounce y useLenis
  pages/        CharactersPage, EpisodesPage y FavoritesPage
  utils/        formateadores, localStorage y filtros
  sass/         abstracts, base, components, layout, pages y themes
```

## Scripts

```bash
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # build de producción en dist/
pnpm preview   # sirve el build en local
pnpm lint      # oxlint
pnpm deploy    # build + publicación en GitHub Pages (rama gh-pages)
```

---

Proyecto hecho por [Álvaro Barrena Revilla](https://www.alvarobarrena.com/).
