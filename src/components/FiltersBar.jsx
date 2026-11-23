import { EMPTY_FILTERS } from '@/utils/filters.jsx'

// Opciones del selector de estado; la primera ("Todos") equivale a no filtrar
const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' },
]

// Sugerencias para el datalist de especie; ayudan sin restringir el valor
const SPECIES_SUGGESTIONS = [
  'Human',
  'Alien',
  'Humanoid',
  'Robot',
  'Animal',
  'Mythological Creature',
  'Disease',
  'Cronenberg',
]

// Barra de filtros controlada: el padre guarda los valores y aplica el debounce
export default function FiltersBar({ filters, onChange }) {
  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value })

  return (
    <section className="filters" aria-label="Filtros de personajes">
      <div className="filters__field">
        <label htmlFor="filter-name" className="filters__label">
          Buscar por nombre
        </label>
        <input
          type="search"
          id="filter-name"
          className="input"
          placeholder="Ej. Rick, Morty…"
          autoComplete="off"
          value={filters.name}
          onChange={set('name')}
        />
      </div>

      <div className="filters__field">
        <label htmlFor="filter-status" className="filters__label">
          Estado
        </label>
        <select id="filter-status" className="input" value={filters.status} onChange={set('status')}>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__field">
        <label htmlFor="filter-species" className="filters__label">
          Especie
        </label>
        <input
          type="text"
          id="filter-species"
          className="input"
          placeholder="Ej. Human, Alien…"
          list="species-options"
          autoComplete="off"
          value={filters.species}
          onChange={set('species')}
        />
        <datalist id="species-options">
          {SPECIES_SUGGESTIONS.map((sp) => (
            <option key={sp} value={sp} />
          ))}
        </datalist>
      </div>

      <div className="filters__actions">
        <button type="button" className="btn btn--ghost" onClick={() => onChange(EMPTY_FILTERS)}>
          Limpiar filtros
        </button>
      </div>
    </section>
  )
}
