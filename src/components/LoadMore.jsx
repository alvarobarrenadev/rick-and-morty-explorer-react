import ErrorMessage from './ErrorMessage.jsx'
import Loader from './Loader.jsx'

// Zona inferior de las listas paginadas:
// loader mientras carga, botón si hay más páginas y error con reintento si falla
export default function LoadMore({ status, info, error, onLoadMore }) {
  if (status === 'loading-more') {
    return (
      <div className="page__load-more">
        <Loader label="Cargando más…" />
      </div>
    )
  }

  // info.next es null cuando la API ya no tiene más páginas
  const hasMore = Boolean(info?.next) && status === 'ready'

  return (
    <div className="page__load-more">
      {hasMore && (
        <button type="button" className="btn btn--secondary" onClick={onLoadMore}>
          Cargar más
        </button>
      )}
      {error && (
        <ErrorMessage title="No se pudo cargar la siguiente página" message={error} onRetry={onLoadMore} />
      )}
    </div>
  )
}
