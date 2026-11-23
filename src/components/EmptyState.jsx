// Bloque que indica que no hay resultados, con una acción opcional (botón o enlace)
export default function EmptyState({ title = 'Sin resultados', message = '', action = null }) {
  return (
    <div className="message message--empty">
      <div className="message__icon" aria-hidden="true">
        ∅
      </div>
      <div className="message__body">
        <h3 className="message__title">{title}</h3>
        {message && <p className="message__text">{message}</p>}
        {action}
      </div>
    </div>
  )
}
