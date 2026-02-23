import type { PresentationChartId } from '../../data/solarIndustryUpdateSlides'
import { DOECostBreakdownChart } from './DOECostBreakdownChart'
import { EnergyStorageChart } from './EnergyStorageChart'
import { ImportsByRegionChart } from './ImportsByRegionChart'
import { ModulePricesChart } from './ModulePricesChart'

const CHARTS: Record<PresentationChartId, () => React.ReactNode> = {
  'energy-storage': EnergyStorageChart,
  'module-prices': ModulePricesChart,
  'imports-by-region': ImportsByRegionChart,
  'doe-cost-breakdown': DOECostBreakdownChart,
}

export function PresentationChart({ chartId }: { chartId: PresentationChartId }) {
  const Chart = CHARTS[chartId]
  return Chart ? <Chart /> : null
}
