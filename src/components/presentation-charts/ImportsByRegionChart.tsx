/**
 * U.S. module imports Q3 2024 by region (GW dc)
 * Approximate from U.S. Census USA Trade Online
 * MDS: categorical palette (4–6 categories)
 */
const DATA = [
  { region: 'Vietnam', gw: 4.2 },
  { region: 'Thailand', gw: 3.8 },
  { region: 'Malaysia', gw: 3.2 },
  { region: 'Cambodia', gw: 2.1 },
  { region: 'S. Korea', gw: 0.9 },
  { region: 'Other', gw: 1.2 },
] as const

const MAX_GW = 5

const CATEGORY_COLORS = [
  'var(--mds-color-electric-blue-900)',
  'var(--mds-color-cyan-500)',
  'var(--mds-color-electric-blue-500)',
  'var(--mds-color-deep-blue-600)',
  'var(--mds-color-cyan-700)',
  'var(--mds-color-neutral-54)',
] as const

export function ImportsByRegionChart() {
  return (
    <figure className="presentation-chart presentation-chart--horizontal-bar" aria-label="U.S. module imports Q3 2024 by region in GW dc">
      <div className="presentation-chart__bars presentation-chart__bars--horizontal">
        {DATA.map((d, i) => (
          <div key={d.region} className="presentation-chart__row">
            <span className="presentation-chart__axis-label">{d.region}</span>
            <div className="presentation-chart__bar-track">
              <div
                className="presentation-chart__bar"
                style={{
                  width: `${(d.gw / MAX_GW) * 100}%`,
                  backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                }}
                title={`${d.gw} GW dc`}
              />
            </div>
            <span className="presentation-chart__value">{d.gw} GW</span>
          </div>
        ))}
      </div>
      <figcaption className="presentation-chart__caption">Q3 2024 total: 15.4 GW dc</figcaption>
    </figure>
  )
}
