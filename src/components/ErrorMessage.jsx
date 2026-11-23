// Mensaje de error dentro de la interfaz (nunca alert())
// Si se pasa onRetry, muestra un botón "Reintentar" que vuelve a lanzar la petición fallida
export default function ErrorMessage({ title = 'Algo salió mal', message = '', onRetry }) {
  return (
    <div className="message message--error" role="alert">
      <div className="message__icon" aria-hidden="true">
        !
      </div>
      <div className="message__body">
        <h3 className="message__title">{title}</h3>
        {message && <p className="message__text">{message}</p>}
        {onRetry && (
          <button type="button" className="btn btn--ghost" onClick={onRetry}>
            Reintentar
          </button>
        )}
      </div>
    </div>
  )
}
