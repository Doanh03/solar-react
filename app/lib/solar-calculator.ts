export type SolarInput = {
  monthlyBill: number;
  propertyType: 'home' | 'factory' | 'office' | 'shop' | 'farm';
  roofArea?: number;
};

export type SolarEstimate = {
  version: 'solar_estimate_v1';
  capacityKwp: number;
  panels: number;
  roofAreaM2: number;
  annualGenerationKwh: number;
  monthlySavings: number;
  estimatedInvestment: number;
  paybackYears: number;
  disclaimer: string;
};

const ASSUMPTIONS = {
  panelKwp: 0.55,
  roofM2PerPanel: 2.1,
  generationKwhPerKwpPerYear: 1450,
  selfConsumptionRate: 0.82,
  installationCostPerKwp: 15_500_000,
  electricityPrice: 3_200,
};

export function estimateSolar(input: SolarInput): SolarEstimate {
  const monthlyUsageKwh = input.monthlyBill / ASSUMPTIONS.electricityPrice;
  const annualUsageKwh = monthlyUsageKwh * 12;
  const rawCapacity = annualUsageKwh / ASSUMPTIONS.generationKwhPerKwpPerYear;
  const capacityKwp = Math.max(2.2, Math.min(100, Math.ceil(rawCapacity * 2) / 2));
  const panels = Math.ceil(capacityKwp / ASSUMPTIONS.panelKwp);
  const roofAreaM2 = panels * ASSUMPTIONS.roofM2PerPanel;
  const annualGenerationKwh = Math.round(capacityKwp * ASSUMPTIONS.generationKwhPerKwpPerYear);
  const monthlySavings = Math.round(
    (annualGenerationKwh / 12) * ASSUMPTIONS.selfConsumptionRate * ASSUMPTIONS.electricityPrice,
  );
  const estimatedInvestment = Math.round(capacityKwp * ASSUMPTIONS.installationCostPerKwp);
  const paybackYears = Number((estimatedInvestment / Math.max(monthlySavings * 12, 1)).toFixed(1));

  return {
    version: 'solar_estimate_v1',
    capacityKwp,
    panels,
    roofAreaM2: Math.round(roofAreaM2),
    annualGenerationKwh,
    monthlySavings,
    estimatedInvestment,
    paybackYears,
    disclaimer:
      'Ước tính tham khảo. Kết quả thực tế phụ thuộc khu vực, hướng và góc mái, bóng che, thiết bị, thời tiết, profile tiêu thụ và phương án hệ thống.',
  };
}
