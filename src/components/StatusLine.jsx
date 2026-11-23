import { statusLabel, statusModifier } from '@/utils/formatters.jsx'

// Línea con el punto de color del estado y el texto "Estado · Especie"
export default function StatusLine({ character, className }) {
  return (
    <p className={className}>
      <span className={`status-dot status-dot--${statusModifier(character.status)}`} aria-hidden="true" />
      {`${statusLabel(character.status)} · ${character.species || 'Especie desconocida'}`}
    </p>
  )
}
