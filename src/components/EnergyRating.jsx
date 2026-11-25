// Étiquettes DPE (consommation d'énergie) et GES (émissions), selon les couleurs réglementaires.
const scales = {
  dpe: {
    label: 'Diagnostic de performance énergétique',
    unit: 'kWh/m²/an',
    colors: ['#009C6D', '#52B153', '#78BD76', '#F4E70F', '#F0B50F', '#EB8235', '#D7221F'],
  },
  ges: {
    label: 'Émissions de gaz à effet de serre',
    unit: 'kg CO₂/m²/an',
    colors: ['#F6EDFD', '#E4C7FB', '#D4A9F9', '#CB95F3', '#BA72EA', '#A94CEE', '#8B1AE1'],
  },
}
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export default function EnergyRating({ kind, value, amount }) {
  const scale = scales[kind]
  return (
    <figure>
      <figcaption className="mb-4 text-[14px] font-semibold text-navy">{scale.label}</figcaption>
      <ol className="space-y-1" aria-label={`${scale.label} : classe ${value}, ${amount} ${scale.unit}`}>
        {letters.map((letter, i) => {
          const active = letter === value
          return (
            <li key={letter} className="flex items-center gap-3" aria-hidden="true">
              <span
                className={`flex h-7 items-center rounded-r-[3px] pl-2.5 text-[13px] font-bold ${kind === 'ges' && i < 4 ? 'text-navy' : 'text-white'} ${
                  active ? 'ring-2 ring-navy ring-offset-1' : 'opacity-80'
                }`}
                style={{ backgroundColor: scale.colors[i], width: `${30 + i * 9}%` }}
              >
                {letter}
              </span>
              {active && (
                <span className="text-[13px] font-semibold text-navy">
                  {amount} <span className="font-normal text-ink-muted">{scale.unit}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
