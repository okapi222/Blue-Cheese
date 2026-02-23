/**
 * Fall 2024 Solar Industry Update – NREL
 * Slide content derived from NREL/PR-7A40-92257 (October 30, 2024)
 */

export type PresentationChartId =
  | 'energy-storage'
  | 'module-prices'
  | 'imports-by-region'
  | 'doe-cost-breakdown'

export interface SlideContent {
  title: string
  subtitle?: string
  bullets?: string[]
  note?: string
  chart?: PresentationChartId
}

export const solarIndustryUpdateSlides: SlideContent[] = [
  {
    title: 'Fall 2024 Solar Industry Update',
    subtitle: 'David Feldman, Jarett Zuboy, Krysta Dummit (SETO), Dana Stright, Matthew Heine, Shayna Grossman (ORISE), Meenakshi Narayanaswami, Robert Margolis',
    note: 'October 30, 2024. Photo: U.S. Department of Energy 2024 Hit Me with Your Sun Shot.',
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
  },
  {
    title: 'Executive Summary',
    bullets: [
      'U.S. PV Deployment: EIA projects significant growth for PV in 2024 over 2023. Over the next 2 years, virtually all new electric generation capacity will be PV, batteries, and wind.',
      '~14.1 GWh (4.3 GW ac) of energy storage installed in Q1/Q2 2024—largest first half on record.',
      'Thin-film PV ~3% globally (2015–2023) but >17% of U.S. deployments (24% utility-scale).',
      '~45% of battery capacity and ~26% of utility-scale PV were hybrid PV/BESS in 2023.',
      'Third-party ownership share of U.S. residential PV increased sharply in 2024 (IRA, interest rates).',
      'PV System Pricing: Most data suggest CAPEX decreases in H1 2024; module prices ~$0.10/W dc, polysilicon up 3% but below production costs; U.S. module $0.31/W dc (Q2 2024), 190% premium over global.',
      'Global Manufacturing: Top 10 module manufacturers 226 GW shipments in H1 2024 (+40% y/y). U.S. produced 4.2 GW modules (+75% y/y). >95 GW manufacturing capacity added since IRA.',
      'U.S. PV Imports: Q3 2024 module imports ~15.4 GW dc (48.5 GW dc YTD). DOC preliminary CVD on c-Si from Vietnam, Malaysia, Thailand, Cambodia. Cell TRQ 12.5 GW—9.4 GW imported by Oct 28.',
    ],
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'CSP: IRENA reports global weighted average LCOE for CSP fell from $0.39/kWh (2010) to under $0.12/kWh (2023), −70%. CAPEX for parabolic trough and power tower declined 58% and 68%. Several CSP projects target 100-hour+ storage.',
  },
  {
    title: 'Concentrating Solar Power Update',
    bullets: [
      'NREL moving to 100-kW demo in ARPA-E 100-hour thermal energy storage in sand: 95% round-trip efficiency, ~1% heat loss/day; usable for industrial heat or electricity.',
      'Companies repurposing idle oil wells as thermal storage for solar thermal; 1,000-hour demo in California planned.',
      'POWERCHINA completed first sub-Saharan CSP plant—100 MW Redstone tower (South Africa); originally developed by SolarReserve (2014).',
    ],
  },
  {
    title: 'Global CSP Cost and Performance 2010–2023',
    bullets: [
      'IRENA: global weighted average LCOE of CSP fell from $0.39/kWh to under $0.12/kWh (−70%).',
      'Drivers: installed costs −37%, capacity factor +82% (more storage), O&M −48%.',
      '2022–2023: one project each in China (2022) and UAE (2023, 15 h storage); LCOE −4%.',
    ],
    note: 'Charts: Total Installed Cost (2023 USD/W), Capacity Factor (%), LCOE (2023 USD/kWh). Source: IRENA, Renewable Power Generation Costs in 2023.',
  },
  {
    title: 'Global CSP Cost and Performance 2010–2023',
    bullets: [
      'Total cost for parabolic trough and power tower declined 58% and 68% from 2010/2011 to 2023.',
      'Largest cost-decline drivers for towers: heliostat field, balance of plant/engineering, receiver.',
      'Largest for parabolic trough: solar field.',
    ],
    note: 'Stacked bar breakdown: Balance of plant, Engineering, Heliostat field, HTF, Power block, Receiver, Solar field, TES, Tower, Owner\'s costs. Source: IRENA.',
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'U.S.: EIA projects significant PV growth in 2024; 14.1 GWh storage in Q1/Q2 2024; thin-film >17% of U.S. PV; hybrid PV/BESS ~45% battery, ~26% utility PV; TPO share of residential up in 2024.',
  },
  {
    title: 'U.S. Generation Capacity Additions and Retirements',
    subtitle: '2013–2023 and Planned 2024–2025',
    bullets: [
      'EIA projects significant PV growth in 2024 over 2023.',
      'Over the next 2 years, virtually all new capacity will be PV, batteries, and wind.',
      'Projections slightly lower than earlier in the year; more projects in pipeline.',
      'By end of 2025, EIA projects >220 GW ac of PV in the United States (second to natural gas).',
    ],
    note: 'Source: EIA Form 860M, Short-Term Energy Outlook.',
  },
  {
    title: 'U.S. Energy Storage Installations by Market Segment',
    chart: 'energy-storage',
    bullets: [
      '~14.1 GWh (4.3 GW ac) installed in Q1/Q2 2024—largest first half on record.',
      'Grid-scale concentrated in California (41%), Arizona (19%), Nevada (15%), Texas (13%).',
      'Residential storage in California driven by net metering changes; attachment rate ~70% (was ~8% a year ago).',
    ],
    note: 'Source: Wood Mackenzie, ESA, U.S. Energy Storage Monitor Q3 2024.',
  },
  {
    title: 'U.S. PV System Size Distribution by Year',
    bullets: [
      'Growth since 2015 mostly from systems <20 kW ac and >20 MW ac; largest growth from >150 MW ac.',
      '0% of 2015 installations were above 150 MW ac vs. >35% in 2023.',
    ],
    note: 'Stacked bars by size bands. Sources: EIA-860, EIA-861M, LBNL Tracking the Sun.',
  },
  {
    title: 'U.S. PV Technology Distribution by Year',
    bullets: [
      'Thin-film ~3% of global PV 2015–2023 but >17% of U.S. deployments (24% utility-scale).',
      '16.5% of U.S. PV systems built in 2023 used at least some CdTe.',
    ],
    note: 'Stacked: Not specified, Both c-Si and CdTe, c-Si, CdTe. Sources: EIA-860, SPV Market Research.',
  },
  {
    title: 'U.S. PV Mounting Type by Year',
    bullets: [
      'Single-axis tracking use grew strongly since 2015.',
      '2023: 65% of all PV used single-axis tracking; 92% of ground-mounted used single-axis.',
      'Drivers: lower cost and higher reliability of trackers.',
    ],
    note: 'Stacked: Not specified, One-axis, Fixed-tilt, Ground-mounted <1 MW, Rooftop <1 MW. Sources: EIA-860, EIA-861M, Tracking the Sun.',
  },
  {
    title: '>1 MW ac U.S. PV Asset Ownership by Year',
    bullets: [
      '82% of 2023 utility-scale installations (84% cumulative) owned by independent power producers.',
      '2015–2023: 13.1 GW ac owned by electric utilities; 3.4 GW ac in 2023 alone.',
    ],
    note: 'Source: EIA Form EIA-860 2023.',
  },
  {
    title: '>1 MW ac U.S. PV Bifacial',
    bullets: [
      'EIA recently began collecting bifacial data for >1 MW ac; data not yet complete.',
      '2023: ~18% reported bifacial, ~1.4% monofacial, >80% not specified.',
      'Cumulatively ~4.2 GW ac (4.6%) reported as bifacial.',
    ],
    note: 'Source: EIA Form EIA-860 2023.',
  },
  {
    title: 'U.S. Utility-Scale PV and Batteries',
    bullets: [
      '~45% of battery capacity in 2023 was collocated with PV; similar to prior years.',
      'Remaining battery capacity not directly tied to PV or other RE.',
    ],
    note: 'Chart: Battery deployment by type (PV hybrid, Other hybrid, RE-associated, Stand-alone). Source: EIA-860.',
  },
  {
    title: 'U.S. Utility-Scale PV and Batteries',
    bullets: [
      '~26% of PV capacity in 2023 co-located with BESS.',
      'EIA projects strong PV+battery growth 2023–2024 with similar attachment rate.',
      'Attachment rate for 2026–2027 queue projects ~38%.',
    ],
    note: 'Chart: Stand-alone PV vs PV+Storage, Proposed. Source: EIA-860.',
  },
  {
    title: 'U.S. Solar Workforce (IREC)',
    bullets: [
      'End of 2023: >279,000 workers spent most time on solar; +85,907 part-time.',
      '+15,564 jobs (+5.9%) since 2022.',
      'Utility-scale +1,888 (+6.8%); residential +5,945 (+6.3%).',
      'Solar jobs grew in 47 states; Florida, Arizona, Texas, Nevada led.',
      '29% said "very difficult" to find qualified applicants (down from 44% in 2022).',
      'Women ~30%; Black 8.5% (vs 13% in overall workforce).',
    ],
    note: 'Source: IREC, National Solar Jobs Census 2023.',
  },
  {
    title: 'Planned U.S. Electric Generation and Energy Communities',
    bullets: [
      'IRA 10% bonus for projects in "Energy Community" drove many new announcements.',
      'Sep 2022: 1,100+ planned PV, wind, battery projects; 37% in energy communities.',
      'Sep 2024: 1,700 projects; 49% in energy communities (IRS expanded qualifying areas in Mar 2024).',
    ],
    note: 'Map: Planned capacity vs energy communities. Sources: EIA Form 860.',
  },
  {
    title: 'Percent of Planned PV, Wind, and Battery in Energy Communities',
    bullets: [
      'More planned projects in energy communities in Sep 2024 than Sep 2022.',
      'PV: ~44% of planned projects in energy communities (Sep 2024) vs ~34% (Sep 2022).',
      'Capacity share in energy communities generally higher than project count share.',
    ],
    note: 'Charts: % in energy communities and number of projects by technology. Source: EIA Form 860.',
  },
  {
    title: 'Percent of Planned PV in Energy Communities by System Size',
    bullets: [
      'Largest increase in energy community share for PV was for systems <20 MW.',
      'Larger systems were already more likely sited in energy communities before the bonus.',
    ],
    note: 'Source: EIA Form 860.',
  },
  {
    title: 'Percent of Planned BESS in Energy Communities by System Size',
    bullets: [
      'BESS trends similar to PV: largest shift to energy communities in lower-capacity systems.',
      'Sep 2022–2024: share of planned BESS 75–300 MW ac in energy communities fell 10%.',
    ],
    note: 'Source: EIA Form 860.',
  },
  {
    title: 'Percentage of Planned PV Capacity in Energy Communities by State',
    bullets: [
      'Share varies by state; high in Kentucky, Nevada, Arkansas, Texas.',
      'Largest increases: Michigan (+30%), Arkansas (+29%), Utah (+25%), Indiana (+20%), Kentucky (+20%).',
      'Most planned PV in Texas, New York, California (34% capacity in Texas).',
    ],
    note: 'Source: EIA Form 860. Graph includes states with >1 GW planned.',
  },
  {
    title: 'Percent of Operating PV Projects in Energy Communities',
    bullets: [
      'Historical: annual PV in energy communities ranged 16–39% (projects), 17–55% (capacity).',
      'Cumulative (Sep 2024): 26% of projects, 38% of capacity in energy communities.',
      'Planned shares (44% projects, 60% capacity) higher than installed.',
    ],
    note: 'Source: EIA Form 860.',
  },
  {
    title: "Five Things from LBNL's Utility-Scale Solar 2024",
    bullets: [
      'Average LCOE (excl. tax credits) $45/MWh (2022) → $46/MWh (2023); lower capacity factors and higher financing offset better system costs.',
      'Average solar resource of PV systems fell over time but increased slightly in 2023.',
      'Average LCOE in low-sun regions about twice that in sunniest regions.',
      'Tracking share reached 96% in 2023; premium over fixed-tilt $0.20/W dc.',
      'Performance degradation difference 0.6%/year between systems built 2017+ vs pre-2013.',
    ],
    note: 'Source: LBNL Utility-Scale Solar 2024 Edition.',
  },
  {
    title: "Five New Things from Tracking the Sun 2024",
    bullets: [
      '2023 median residential module efficiency ~20.8% (flat y/y); +43% from 2010.',
      'Third-party ownership share rose in 2023 to 27% (first increase since 2015); varies by state.',
      'Micro-inverters gained share vs DC-optimized for residential/small; MLPE ~90%; DC optimizers dominate large nonresidential.',
      'Residential attachment rate 12% in 2023; common sizes 10 or 13.5 kWh, 5 kW.',
      '94% of residential on detached single-family; nonresidential: 50% commercial, 36% agricultural, 15% tax-exempt.',
    ],
    note: 'Source: LBNL Tracking the Sun 2024.',
  },
  {
    title: 'Residential PV TPO Trends',
    bullets: [
      'TPO share of U.S. residential PV increased sharply in 2024.',
      'High interest rates made loans less attractive; IRA bonus tax credits (to companies, not homeowners) incentivize TPO.',
      'TPO share increased for PV+BESS; NEM 3.0 in California drove shift to hybrid.',
      'Historically: TPO grew in early 2010s; direct ownership grew mid-2010s with lower costs and new loan products.',
    ],
    note: 'Chart: TPO share in AZ, CA, MA, NY and national benchmarked system costs. Sources: state data, DOE benchmarks, Wood Mackenzie.',
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'PV pricing: CAPEX down in H1 2024; 2023 ranges $2.3–4.4/W residential, $1.5–3.2/W nonresidential, $1.0–1.3/W utility; H1 2024 $2.7–4.2/W residential, $1.6–3.4/W nonresidential, $1.1/W utility.',
  },
  {
    title: 'Tracking the Sun: National Price 2000–2023',
    bullets: [
      'Price declines averaged $0.1–0.2/W dc across segments over the past decade.',
      '2022–2023: median residential price down ~$0.10/W dc; nonresidential up $0.10–0.20/W dc (first increase in 15 years).',
    ],
    note: 'Source: LBNL Tracking the Sun 2024.',
  },
  {
    title: 'DOE-Estimated Utility-Scale PV/ESS System Cost Breakdown, Q1 2024',
    chart: 'doe-cost-breakdown',
    bullets: [
      'Utility-scale PV ~$1.12/W dc (MMP); without distortions ~$0.98/W dc (MSP).',
      'With 2.4 h storage (vs PV capacity): $1.99/W dc (MMP), $1.73/W dc (MSP).',
    ],
    note: 'Source: DOE Solar PV System Cost Benchmarks.',
  },
  {
    title: 'DOE-Estimated Residential PV/ESS System Cost Breakdown, Q1 2024',
    bullets: [
      'Residential PV ~$3.15/W dc (MMP), ~$2.74/W dc (MSP).',
      'With 2.4 h storage: $5.19/W dc (MMP), $4.50/W dc (MSP).',
    ],
    note: 'Source: DOE Solar PV System Cost Benchmarks.',
  },
  {
    title: 'Representative System Cost Breakdown (APV), Q1 2024',
    bullets: [
      'Agrivoltaic (sheep grazing) system benchmarked for first time.',
      'Sheep cost and income out of scope.',
      'PVSCM implemented in Excel; parameter files available.',
    ],
    note: 'Source: DOE Solar PV System Cost Benchmarks.',
  },
  {
    title: 'Representative System LCOE',
    bullets: [
      'Inputs: PV Cost Benchmarks (overnight cost MSP, amortized O&M 30 yr); ATB (energy yield, financial model).',
      'PV+ESS: add ESS costs and O&M; add 6% to LCOE for energy losses.',
      'LCOE depends on location (±30%); ITC/PTC reduce effective LCOE.',
    ],
    note: 'Source: DOE Solar PV System Cost Benchmarks.',
  },
  {
    title: 'Reported Price of U.S. Utility-Scale PV Projects Over Time',
    bullets: [
      'Large-scale project prices down 8% in real terms in 2023.',
      'Larger systems tend to have lower prices (~$0.23/W dc cheaper for largest vs smaller grid-scale).',
    ],
    note: 'Source: LBNL Utility-Scale Solar 2024 Edition.',
  },
  {
    title: '2023 Modeled, Reported, and Quoted System Prices',
    bullets: [
      'DOE/NREL and LBNL ranges generally overlap other sources.',
      'Reported system pricing generally higher than modeled and quoted.',
    ],
    note: 'Chart: Residential, Nonresidential, Utility-scale by source (WoodMac, DOE, BNEF, LBNL, etc.).',
  },
  {
    title: 'Residential System Price Reported by EnergySage',
    bullets: [
      'After 2021–2023 increases, prices fell to near historical lows; median −7.2% y/y.',
      'State variation $2–3/W; top four deployment states below national average.',
    ],
    note: 'Source: EnergySage Solar Marketplace Intel.',
  },
  {
    title: 'U.S. Utility-Scale Photovoltaic PPA Pricing',
    bullets: [
      'PV-only PPA pricing stagnated over the past 5 years across U.S. markets.',
      'PV PPA still competitive with other technologies; recent gas price declines gave gas slight near-term advantage.',
    ],
    note: 'Source: LBNL Utility-Scale Solar 2024 Edition.',
  },
  {
    title: 'U.S. Solar PPA Pricing (LevelTen)',
    bullets: [
      'U.S. utility-scale PV PPA offers +5.4% q/q, +10.4% y/y.',
      'Drivers: tariffs on imports, premiums on domestic products; possible impact from bundled storage.',
      'ERCOT lowest-priced in Q3 2024; all LevelTen markets saw increases in Q3 2024.',
    ],
    note: 'Source: LevelTen PPA Price Index.',
  },
  {
    title: 'Distributed PV System Pricing from Select States',
    bullets: [
      'H2 2023 to H2 2024 (partial), median stand-alone distributed PV (2023 $): 2.5–10 kW −1% to $4.17/W dc; 10–100 kW −5% to $3.43/W dc; 100–500 kW $2.49; 500 kW–1 MW $2.09; 1–5 MW +14% to $1.58; 5 MW+ +2% to $1.30.',
    ],
    note: 'AZ, CA, MA, NY. Source: state databases.',
  },
  {
    title: 'Distributed PV System Pricing from Select States, 2024 YTD',
    bullets: [
      'Price varies by system size and state; $/W generally decreases with size.',
      '2.5–10 kW median change 2023 to 2024 YTD: AZ −6%, CA −2%, MA −2%, NY −7%.',
    ],
    note: 'Source: state data.',
  },
  {
    title: 'Large Residential Installer Cost and Value, Q3 2024',
    bullets: [
      'Sunrun: system value +17% y/y, +3% q/q in Q3 2024.',
      'Higher value/costs: battery attachment, electricity demand and retail rates, grid reliability, interest rates.',
      'Lower costs/higher margins: ITC adders (low-income, energy communities, domestic content); Sunrun/Sunnova average ITC 37–38% in Q3 2024.',
    ],
    note: 'Chart: Installation, Sales, G&A, Net Value, Battery attachment. Source: Corporate filings.',
  },
  {
    title: 'Utility-Scale PV Installed Costs by Country, 2023',
    bullets: [
      'Global capacity-weighted average total installed cost 2023: $0.76/W dc (−17% from 2022).',
      'Global: Module+inverter 39%, BOS 26%, Installation 16%, Other soft 19%.',
      'U.S. 46% higher than global: Module/inverter +53%, BOS +39%, Installation +69%, Other soft +21%.',
    ],
    note: 'Source: IEA Snapshot of Global PV Markets 2024; IRENA Renewable Power Generation Costs 2023.',
  },
  {
    title: 'SunPower Bankruptcy',
    bullets: [
      'Residential installer SunPower Corp. declared bankruptcy August 2024.',
      'Interest rates, California NEM policy, and accounting issues contributed.',
      'SunPower roles: high-efficiency modules, utility developer, residential/commercial dealer and financier.',
      'Back-contact technology continues via Maxeon Solar Technologies (also under financial pressure).',
    ],
    note: 'Timeline: 1985 founding through 2024. Sources: Canary Media, PV Tech, Utility Dive.',
  },
  {
    title: 'U.S. Utility-Scale PV+Battery PPA Pricing (LBNL)',
    bullets: [
      'Upward trend in continental U.S. PPAs; 2024 prices about twice typical 2020.',
      'Larger storage (hours and battery:PV ratio) explains part of increase.',
      '2023 average storage duration 3.2 h (2.9 in 2022); battery:PV ratio 0.7 (0.6 in 2022).',
    ],
    note: 'Source: LBNL Utility-Scale Solar 2024 Edition.',
  },
  {
    title: 'Residential PV + Storage Pricing in California',
    bullets: [
      '2024 YTD median PV+storage: $3,159/kWh or $5,783/kW ac ($5,473/kW dc), +4–16% from 2023.',
      'Most systems 2–3 hours storage.',
    ],
    note: 'Filtered to PV ≤10 kW dc. Source: California Distributed Generation.',
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'Manufacturing: Top 10 module makers 226 GW H1 2024; U.S. 4.2 GW modules (+75% y/y); >95 GW capacity added since IRA; c-Si cell production ramping H2 2024; IRS clarified 48D for domestic ingot/wafer.',
  },
  {
    title: 'PV Shipment Rankings',
    bullets: [
      'Top 10 module manufacturers 226 GW shipments in H1 2024 (+40% y/y).',
      'TOPCon 70% of sales in Q1 2024 (N-type 18% in Q1 2023).',
      'Companies responding with more internal cell consumption, overseas expansion, shift to TOPCon.',
    ],
    note: 'Rankings: Jinko, JA Solar, Trina, LONGi, Tongwei, Canadian Solar, GCL/DAS, Risen, etc. Source: InfoLink, PV Magazine, PVTech.',
  },
  {
    title: 'PV Manufacturing in the MENA Region',
    bullets: [
      'MENA: >8 GW c-Si module, 2 GW cell, 2 GW wafer capacity.',
      'Most capacity in Türkiye; announcements across the region.',
      '>50 GW polysilicon, >50 GW wafer, 40 GW cell, >35 GW module, 6 GW tracker announced across 7 countries; Chinese firms (Jinko, Trina, GCL, etc.) expanding into Middle East.',
    ],
    note: 'Source: Internal DOE tracking.',
  },
  {
    title: "PV Manufacturers' Margins",
    bullets: [
      'Despite record shipments, average margins remain below historical levels; Q3 2024 at lows not seen since 2019.',
      'First Solar gross margin rose to 50%—highest in over a decade.',
    ],
    note: 'Chart: Gross and operating margin over time. Source: Company filings.',
  },
  {
    title: 'U.S. PV Manufacturing',
    bullets: [
      'H1 2024: U.S. produced 4.2 GW modules (+75% y/y); roughly even thin-film and c-Si.',
      'c-Si cell production and capacity expected to ramp in H2 2024.',
      'c-Si manufacturers added significant capacity in H1 2024.',
      'Since 2018, U.S. module production and capacity up ~9–10×.',
    ],
    note: 'Chart: Thin-film and c-Si production and excess capacity. Source: PVTech, Wood Mackenzie/SEIA.',
  },
  {
    title: 'Domestic Manufacturing Growth',
    bullets: [
      'Since IRA: >95 GW manufacturing capacity added across supply chain; nearly 42 GW new module capacity.',
      'Q3 2024 milestones: First Solar (Alabama 3.5 GW); Runergy (Alabama 5 GW); Suniva (Georgia 1 GW cells, shipped to Heliene); Siemens (Wisconsin 0.8 GW utility inverters—first U.S. utility-scale inverter production).',
      'Nearly 50 GW nameplate domestic module capacity; terrestrial c-Si cells and utility-scale inverters now produced in U.S.',
    ],
    note: 'Source: U.S. Census, DOE tracking.',
  },
  {
    title: 'Domestic Manufacturing Announcements',
    bullets: [
      'Since IRA: >370 GW capacity announced; ~37,000 jobs, ~$17B across 124 facilities/expansions.',
      'Recent: Hemlock $325M grant, 48D for wafers; Boviet 2 GW TOPCon in NC; DYCM 6 GW, Translucent/Akcome 1.2 GW vertical; Ebon, ES Foundry, IRH, Talon cell plans.',
      'Cell manufacturing announcements growing strongly.',
    ],
    note: 'Source: DOE tracking.',
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'Component pricing: Q3 2024 module +1%, ~$0.10/W dc; polysilicon +3%, still below cost; U.S. module $0.31/W dc (Q2), 190% premium; imported cell $0.12/W dc (Q3).',
  },
  {
    title: 'PV Value Chain Global Spot Pricing',
    bullets: [
      'Polysilicon: +3% Aug–Oct 2024 ($5.66–5.86/kg); below production cost for most; supply pace ~700 GW dc wafers in Q1–Q3; BNEF expects $5–6/kg.',
      'Wafers +1%, cells −5%, modules +1% (~$0.10/W dc); overcapacity depressing prices; BNEF expects further reductions.',
    ],
    note: 'Chart: Polysilicon ($/kg), wafer/cell/module ($/W dc). Source: BloombergNEF.',
  },
  {
    title: 'Module Prices: Global vs United States',
    chart: 'module-prices',
    bullets: [
      'Q2 2024 U.S. average module $0.31/W dc (−6% q/q, −16% y/y); 190% premium over global spot.',
      'Declining U.S. trend from: lower upstream prices, more import competition, new U.S. facilities and scale.',
      'U.S.–global gap narrowed to $0.20/W dc in Q2.',
    ],
    note: 'Source: BNEF, EIA, Wood Mackenzie/SEIA.',
  },
  {
    title: 'Calculated U.S. Module and Cell Import Pricing',
    bullets: [
      'Q3 2024: average U.S. module just under $0.25/W dc; cell $0.12/W dc.',
      '~23% of modules reported paying tariff in Q3 (up from 3% Q2, <1% Q1).',
      'Declines across all countries; steepest for Thailand. Current nominal prices at all-time domestic lows (inflation-adjusted).',
    ],
    note: 'Charts: Imported module/cell $/W and effective 201 tariff; by country. Source: U.S. Census USA Trade Online.',
  },
  {
    title: 'Cost Challenges of Domestic Cell and Wafer Manufacturing',
    bullets: [
      'NREL (Dec): domestic c-Si cells from domestic wafer/poly estimated $0.135/W premium over Southeast Asia.',
      'Drivers: less developed supply chain, higher cost of capital, labor, environmental controls.',
      'Analysis excludes federal incentives.',
    ],
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'Market & policy: Invesco Solar ETF +10% Q3 2024; IRS 48D for domestic ingot/wafer; Rhode Island energy storage goal 600 MW by 2033.',
  },
  {
    title: 'States: Q2 2024 Updates',
    bullets: [
      'California: Governor vetoed bill for multimeter properties (schools, farms, multifamily) to use own solar output.',
      'Colorado: APPS grant program reopened—$1M for automated residential permitting.',
      'Connecticut: PURA authorized multifamily net metering rules; benefits must pass to tenants.',
      'New Mexico: Community solar +300 MW (more than double).',
      'Rhode Island: Energy storage goal—600 MW by 2033 (100% clean energy by 2033).',
    ],
    note: 'Sources: CESA, Solar Power World, PV Magazine, PV Tech, NC Clean Energy Technology Center.',
  },
  {
    title: 'Tax Credit Updates',
    bullets: [
      'Oct 22: Treasury/IRS final guidance on 48D (CHIPS ITC). Semiconductor wafer production includes PV ingots/wafers—domestic solar ingot/wafer producers eligible for 25% credit. Effective Dec 23, 2024; facilities operating after end of 2022 or before end of 2026.',
      'Oct 24: Final guidance on 45X (Advanced Manufacturing Production Credit). Aligned with Dec 2023 proposal; clarifies definitions and credit amounts. Full credit through Dec 31, 2029; then phaseout.',
    ],
  },
  {
    title: 'BLM Solar Plan Released',
    bullets: [
      'August: BLM final proposed roadmap for solar on BLM lands (update to 2012 plan).',
      '31.7 million acres available; "reasonably foreseeable" scenario 700,000 acres by 2045.',
      'States expanded from 6 to 11 (added ID, MT, OR, WA, WY).',
      'Exclusions modified: no insolation minimum, higher slope, resource-based exclusions, within 15 miles of transmission unless disturbed land.',
      'Publication after 30-day protest and 60-day governor consistency review.',
    ],
    note: 'Source: BLM PEIS.',
  },
  {
    title: 'Stock Market Activity',
    bullets: [
      'Invesco Solar ETF +10% in Q3 2024 (S&P 500 +5%, Russell 2000 +10%).',
      'Fed cut benchmark 0.5% mid-Sep; further cuts expected; solar projects sensitive to interest rates.',
    ],
    note: 'Charts: 10-year Treasury vs indices; individual stock performance Q1–Q3 2024. Source: Fed, Invesco, Yahoo Finance.',
  },
  {
    title: 'SREC Pricing',
    bullets: [
      'SREC pricing relatively stable in 2024; some movement at June energy year change.',
      'Forward contracts at discount to spot: RECMint estimates 11–24% (3-yr), 33–46% (5-yr).',
    ],
    note: 'Charts: Lower-priced (PA, MD, OH, VA) and higher-priced (NJ, DC, MA SREC II). Source: SRECTrade, RECMint.',
  },
  {
    title: 'Agenda',
    bullets: [
      'Global Solar Deployment',
      'U.S. PV Deployment',
      'PV System Pricing',
      'Global Manufacturing',
      'Component Pricing',
      'Market and Policy',
      'U.S. PV Imports',
    ],
    note: 'Imports: Q3 2024 ~15.4 GW dc modules (48.5 GW dc YTD); DOC preliminary CVD on Vietnam, Malaysia, Thailand, Cambodia (0–300%); cell TRQ 12.5 GW, 9.4 GW imported by Oct 28.',
  },
  {
    title: 'U.S. Module Imports Q3 2024 by Region',
    chart: 'imports-by-region',
    bullets: [
      'Q3 2024: 15.4 GW dc modules; 48.5 GW dc YTD 2024.',
      'Vietnamese c-Si imports fell >1 GW June–August (possible AD/CVD moratorium end in June).',
    ],
    note: 'Source: U.S. Census USA Trade Online.',
  },
  {
    title: 'U.S. Module Imports Q1–Q3 2024 by Tariff',
    bullets: [
      '4.2 GW dc (9%) reported paying tariff; 84% of that in Q3 (bifacial exemption revoked May 2024).',
      'No tariff: c-Si exempt (34.6 GW dc), thin-film (9.4 GW dc); exempt countries 5.2 GW dc c-Si.',
    ],
    note: 'Source: U.S. Census USA Trade Online.',
  },
  {
    title: 'U.S. Module Imports by Tariff Over Time',
    bullets: [
      '2019–2021: 40–60% of imports reported paying tariff; share fell sharply from 2022; record low 4% in 2023.',
      'Exemptions: thin-film (incl. CdTe); exempt countries (e.g. Canada, Cambodia); bifacial (Oct 2020–May 2024) or IBC.',
    ],
    note: 'Source: U.S. Census USA Trade Online.',
  },
  {
    title: 'Preliminary CVD Determination for SE Asian Countries',
    bullets: [
      'Oct 1: DOC preliminary CVD on c-Si panels/cells from Vietnam, Malaysia, Thailand, Cambodia. Rates 0%–300%. CBP collecting immediately; preliminary; subject to change and annual adjustment.',
      'Malaysia: Hanwha 14.72%, Jinko 9.92%, others 123.94% or 9.13%.',
      'Vietnam: Boviet 0.81%, others 292.61% or 2.85%. Thailand: Trina 0.14%, others 34.52% or 23.06%. Cambodia: Jintek/ISC 68.45%, others 8.25%.',
    ],
    note: 'Source: DOC preliminary determination.',
  },
  {
    title: 'Preliminary CVD – Critical Circumstances',
    bullets: [
      'DOC found critical circumstances for Vietnam and Thailand (surging imports).',
      'If USITC finds injury, retroactive duties (up to 90 days) for Vietnam and Thailand; Boviet, Trina, JA Solar exempt from retroactive.',
      'Final CVD expected Feb 10, 2025; preliminary AD expected Nov 27, 2024.',
    ],
    note: 'Chart: Quarterly c-Si module/cell imports Vietnam vs Thailand. Source: DOC, U.S. Census.',
  },
  {
    title: 'UFLPA Actions 2022–2024',
    bullets: [
      'CBP electronics detainments under UFLPA ~$1B/year; peak $280M March 2024, $30M June.',
      'Malaysia 50%, Vietnam 30%, Thailand 17% of detainments.',
      'Share denied dropped: 46% (2022) vs 11% (2023) vs 7% (2024 YTD). By country: Malaysia 14%, Vietnam 22%, Thailand 20% denied.',
    ],
    note: 'Electronics: solar, IT, circuits, etc. Source: CBP UFLPA Statistics.',
  },
  {
    title: 'SEIA Introduces New ANSI Standard',
    bullets: [
      'SEIA Standard 101 (third draft): due diligence on forced labor in solar/storage supply chains; material traceability; rubric for raw materials to end product.',
      'Based on real CBP detainment examples; input from manufacturers, developers, auditors.',
      'Certification of product, supply chain system, or business; SEIA to work with auditors after publication. Comments closed Nov 4, 2024.',
    ],
  },
  {
    title: 'c-Si PV Cell Import Data July/August 2024',
    bullets: [
      'Q3 2024: >4.2 GW dc cells imported; fifth quarter of >20% q/q growth. Thailand 28%, Malaysia 36%.',
      'President raised cell TRQ to 12.5 GW in August; >9.4 GW (75%) imported by Oct 28. At current rate, limit reached in December.',
    ],
    note: 'Charts: Cell imports by region; TRQ usage. Source: U.S. Census, CBP Commodity Status.',
  },
  {
    title: 'Longshoremen Strike Impacts',
    bullets: [
      'Oct 1, 2024: ~45,000 dockworkers struck East and Gulf Coast ports; 3 days.',
      'Modules: 96% by sea, 55% of modules would have been impacted.',
      'Cells: ~40% by air to airports near module plants; impact muted.',
    ],
    note: 'Strike suspended until Jan 15. Source: U.S. Census, DOE tracking, AP News.',
  },
  {
    title: 'Longshoremen Strike Impacts',
    bullets: [
      'Cell imports: bulk concentrated at airports near large capacity facilities; ~40% by air.',
    ],
    note: 'Source: U.S. Census, DOE tracking.',
  },
  {
    title: 'Interested in more data in Tableau?',
    subtitle: 'Click the link in the deck to explore interactive visualizations.',
  },
  {
    title: 'Thank You',
    subtitle: 'NREL/PR-7A40-92257',
    bullets: [
      'Special thanks to Nate Blair, Tim Meehan, Michael Matz, and Adam Warren.',
      'Authored in part by NREL, operated by Alliance for Sustainable Energy, LLC, for the U.S. DOE under Contract No. DE-AC36-08GO28308.',
      'Funding: U.S. DOE Office of Energy Efficiency and Renewable Energy, Solar Energy Technologies Office.',
      'Views do not necessarily represent DOE or the U.S. Government.',
    ],
    note: 'www.nrel.gov',
  },
  {
    title: 'List of Acronyms and Abbreviations',
    bullets: [
      'ac, AD, ANSI, APV, ARPA-E, BESS, BLM, BoP, BOS, c-Si, CAPEX, CBP, CdTe, CSP, CVD, dc, DOC, DOE, EBOS, EIA, ERCOT, ESS, GW, GWh, H1/H2, IRA, IREC, IRENA, IRS, ITC, LBNL, LCOE, MMP, MSP, MW, NEM, NREL, O&M, PPA, PTC, PV, q/q, SEIA, SETO, TPO, TRQ, UFLPA, UPV, USD, W, y/y, YTD.',
    ],
    note: 'Full list available in original NREL deck.',
  },
]
