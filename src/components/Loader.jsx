// Spinner animado con un texto descriptivo
// role="status" y aria-live="polite" anuncian la carga a los lectores de pantalla
export default function Loader({ label = 'Cargando…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  )
}
