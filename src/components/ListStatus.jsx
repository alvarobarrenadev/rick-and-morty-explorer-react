import EmptyState from './EmptyState.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import Loader from './Loader.jsx'

// Zona de estado de una lista: loader, error con reintento o mensaje de lista vacía
export default function ListStatus({ status, error, onRetry, labels }) {
  return (
    <div className="page__status" aria-live="polite">
      {status === 'loading' && <Loader label={labels.loading} />}
      {status === 'error' && (
        <ErrorMessage
          title={labels.errorTitle}
          message={error || 'Inténtalo de nuevo en un momento.'}
          onRetry={onRetry}
        />
      )}
      {status === 'empty' && <EmptyState title={labels.emptyTitle} message={labels.emptyMessage} />}
    </div>
  )
}
