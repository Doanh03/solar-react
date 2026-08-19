export const CALCULATOR_VERSION = 'solar_estimate_v1'

const DEFAULTS = {
  minKwp: 2.2,
  maxKwp: 30,
  monthlyBillToKwp: 560000,
  annualKwhPerKwp: 1350,
  selfConsumptionRate: 0.62,
  costPerKwp: 13500000,
}

export function calculateSolarEstimate(monthlyBillVnd, overrides = {}) {
  const config = { ...DEFAULTS, ...overrides }
  const bill = Math.max(0, Number(monthlyBillVnd) || 0)
  const kwp = Math.max(config.minKwp, Math.min(config.maxKwp, bill / config.monthlyBillToKwp))
  const annualGenerationKwh = kwp * config.annualKwhPerKwp
  const annualSavingVnd = bill * 12 * config.selfConsumptionRate
  const estimatedInvestmentVnd = kwp * config.costPerKwp
  const paybackYears = estimatedInvestmentVnd / Math.max(annualSavingVnd, 1)

  return {
    version: CALCULATOR_VERSION,
    inputs: { monthlyBillVnd: bill },
    assumptions: {
      annualKwhPerKwp: config.annualKwhPerKwp,
      selfConsumptionRate: config.selfConsumptionRate,
      costPerKwp: config.costPerKwp,
    },
    kwp,
    annualGenerationKwh,
    annualSavingVnd,
    estimatedInvestmentVnd,
    paybackYears,
  }
}
