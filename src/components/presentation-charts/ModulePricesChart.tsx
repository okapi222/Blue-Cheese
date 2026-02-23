/**
 * Module prices: U.S. average vs global spot ($/W dc)
 * Approximate from BNEF, EIA, Wood Mackenzie/SEIA
 * MDS: solid colors; two series
 */
const DATA = [
  { period: 'Q1 20', us: 0.42, global: 0.24 },
  { period: 'Q1 21', us: 0.38, global: 0.22 },
  { period: 'Q1 22', us: 0.36, global: 0.20 },
  { period: 'Q1 23', us: 0.35, global: 0.15 },
  { period: 'Q1 24', us: 0.33, global: 0.11 },
  { period: 'Q2 24', us: 0.31, global: 0.10 },
] as const

const MAX_USD = 0.45

const COLOR_US = 'var(--mds-color-deep-blue-900)'
const COLOR_GLOBAL = 'var(--mds-color-cyan-500)'

export function ModulePricesChart() {
  return (
    <figure className="presentation-chart presentation-chart--grouped-bar" aria-label="PV module price U.S. vs global in dollars per W dc">
      <div className="presentation-chart__bars presentation-chart__bars--grouped">
        {DATA.map((d) => (
          <div key={d.period} className="presentation-chart__bar-group">
            <div className="presentation-chart__bar-wrap">
              <div
                className="presentation-chart__bar presentation-chart__bar--us"
                style={{
                  height: `${(d.us / MAX_USD) * 100}%`,
                  backgroundColor: COLOR_US,
                }}
                title={`U.S.: $${d.us}/W`}
              />
            </div>
            <div className="presentation-chart__bar-wrap">
              <div
                className="presentation-chart__bar presentation-chart__bar--global"
                style={{
                  height: `${(d.global / MAX_USD) * 100}%`,
                  backgroundColor: COLOR_GLOBAL,
                }}
                title={`Global: $${d.global}/W`}
              />
            </div>
            <span className="presentation-chart__axis-label">{d.period}</span>
          </div>
        ))}
      </div>
      <div className="presentation-chart__y-axis">
        <span>$0</span>
        <span>${MAX_USD}/W</span>
      </div>
      <figcaption className="presentation-chart__legend">
        <span className="presentation-chart__legend-item">
          <span className="presentation-chart__legend-dot" style={{ backgroundColor: COLOR_US }} />
          U.S. average
        </span>
        <span className="presentation-chart__legend-item">
          <span className="presentation-chart__legend-dot" style={{ backgroundColor: COLOR_GLOBAL }} />
          Global spot
        </span>
      </figcaption>
    </figure>
  )
}
