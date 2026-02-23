/**
 * U.S. Energy Storage Installations by Market Segment (GWh)
 * Approximate from Wood Mackenzie / ESA U.S. Energy Storage Monitor Q3 2024
 * MDS: solid colors only; 3-category palette
 */
const DATA = [
  { year: '2019', grid: 1.2, cci: 0.2, residential: 0.3 },
  { year: '2020', grid: 2.5, cci: 0.4, residential: 0.5 },
  { year: '2021', grid: 5, cci: 0.6, residential: 1 },
  { year: '2022', grid: 8, cci: 1, residential: 2 },
  { year: '2023', grid: 12, cci: 1.5, residential: 3.5 },
  { year: '2024', grid: 10, cci: 1.2, residential: 2.9 },
] as const

const MAX_GWH = 18

const COLORS = {
  grid: 'var(--mds-color-deep-blue-900)',
  cci: 'var(--mds-color-cyan-500)',
  residential: 'var(--mds-color-electric-blue-500)',
} as const

export function EnergyStorageChart() {
  return (
    <figure className="presentation-chart presentation-chart--stacked-bar" aria-label="U.S. energy storage installations by market segment in GWh">
      <div className="presentation-chart__bars presentation-chart__bars--stacked">
        {DATA.map((d) => (
            <div key={d.year} className="presentation-chart__bar-group">
              <div className="presentation-chart__stack">
                <div
                  className="presentation-chart__segment"
                  style={{
                    height: `${(d.grid / MAX_GWH) * 100}%`,
                    backgroundColor: COLORS.grid,
                  }}
                  title={`Grid-scale: ${d.grid} GWh`}
                />
                <div
                  className="presentation-chart__segment"
                  style={{
                    height: `${(d.cci / MAX_GWH) * 100}%`,
                    backgroundColor: COLORS.cci,
                  }}
                  title={`CCI: ${d.cci} GWh`}
                />
                <div
                  className="presentation-chart__segment"
                  style={{
                    height: `${(d.residential / MAX_GWH) * 100}%`,
                    backgroundColor: COLORS.residential,
                  }}
                  title={`Residential: ${d.residential} GWh`}
                />
              </div>
              <span className="presentation-chart__axis-label">{d.year}</span>
            </div>
        ))}
      </div>
      <div className="presentation-chart__y-axis">
        <span>0</span>
        <span>{MAX_GWH} GWh</span>
      </div>
      <figcaption className="presentation-chart__legend">
        <span className="presentation-chart__legend-item">
          <span className="presentation-chart__legend-dot" style={{ backgroundColor: COLORS.grid }} />
          Grid-Scale
        </span>
        <span className="presentation-chart__legend-item">
          <span className="presentation-chart__legend-dot" style={{ backgroundColor: COLORS.cci }} />
          CCI
        </span>
        <span className="presentation-chart__legend-item">
          <span className="presentation-chart__legend-dot" style={{ backgroundColor: COLORS.residential }} />
          Residential
        </span>
      </figcaption>
    </figure>
  )
}
