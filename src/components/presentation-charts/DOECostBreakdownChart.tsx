/**
 * DOE utility-scale PV system cost breakdown Q1 2024 ($/kW dc)
 * MMP (modeled market price). Approximate from DOE Solar PV System Cost Benchmarks
 * MDS: solid colors; categorical stack
 */
const SEGMENTS = [
  { label: 'Module', value: 336, color: 'var(--mds-color-deep-blue-900)' },
  { label: 'Inverter', value: 62, color: 'var(--mds-color-cyan-500)' },
  { label: 'EBOS', value: 186, color: 'var(--mds-color-electric-blue-500)' },
  { label: 'SBOS', value: 173, color: 'var(--mds-color-deep-blue-600)' },
  { label: 'Fieldwork', value: 140, color: 'var(--mds-color-cyan-700)' },
  { label: 'Other soft', value: 213, color: 'var(--mds-color-neutral-54)' },
] as const

const TOTAL = SEGMENTS.reduce((s, x) => s + x.value, 0)

export function DOECostBreakdownChart() {
  return (
    <figure className="presentation-chart presentation-chart--stacked-horizontal" aria-label="DOE utility-scale PV system cost breakdown in dollars per kW dc">
      <div className="presentation-chart__stack presentation-chart__stack--horizontal">
        {SEGMENTS.map((s) => (
          <div
            key={s.label}
            className="presentation-chart__segment presentation-chart__segment--horizontal"
            style={{
              width: `${(s.value / TOTAL) * 100}%`,
              backgroundColor: s.color,
            }}
            title={`${s.label}: $${s.value}/kW`}
          />
        ))}
      </div>
      <div className="presentation-chart__stack-legend">
        {SEGMENTS.map((s) => (
          <span key={s.label} className="presentation-chart__legend-item">
            <span className="presentation-chart__legend-dot" style={{ backgroundColor: s.color }} />
            {s.label} (${s.value})
          </span>
        ))}
      </div>
      <figcaption className="presentation-chart__caption">
        PV-Only 100 MW dc · Total MMP ~$1,110/kW dc (Q1 2024)
      </figcaption>
    </figure>
  )
}
