export type LeadTemperature = 'hot' | 'warm' | 'cold';

export type LeadScoringInput = {
  monthlyBill?: number;
  propertyType?: 'home' | 'factory' | 'office' | 'shop' | 'farm';
  roofAreaM2?: number;
  solarType?: 'grid-tied' | 'hybrid' | 'battery';
  calculatorUsed?: boolean;
  phoneProvided?: boolean;
};

export type LeadScoreResult = {
  score: number;
  temperature: LeadTemperature;
  reasons: string[];
  version: 'lead_scoring_v1';
};

/**
 * Deterministic, explainable lead scoring. This is a prioritisation aid,
 * not a prediction of purchase intent. Rules can be tuned from real CRM data.
 */
export function scoreLead(input: LeadScoringInput): LeadScoreResult {
  let score = 0;
  const reasons: string[] = [];

  if ((input.monthlyBill ?? 0) >= 10_000_000) {
    score += 30;
    reasons.push('Hóa đơn điện từ 10 triệu/tháng trở lên');
  } else if ((input.monthlyBill ?? 0) >= 5_000_000) {
    score += 22;
    reasons.push('Hóa đơn điện từ 5 triệu/tháng trở lên');
  } else if ((input.monthlyBill ?? 0) >= 2_000_000) {
    score += 12;
    reasons.push('Hóa đơn điện từ 2 triệu/tháng trở lên');
  }

  if (input.propertyType === 'factory' || input.propertyType === 'farm') {
    score += 18;
    reasons.push('Loại công trình có tiềm năng hệ thống lớn');
  } else if (input.propertyType) {
    score += 8;
    reasons.push('Đã xác định loại công trình');
  }

  if ((input.roofAreaM2 ?? 0) >= 100) {
    score += 18;
    reasons.push('Diện tích mái từ 100 m² trở lên');
  } else if ((input.roofAreaM2 ?? 0) >= 40) {
    score += 10;
    reasons.push('Diện tích mái đủ để khảo sát hệ thống');
  }

  if (input.solarType === 'hybrid' || input.solarType === 'battery') {
    score += 12;
    reasons.push('Có nhu cầu hybrid/lưu trữ');
  } else if (input.solarType === 'grid-tied') {
    score += 5;
  }

  if (input.calculatorUsed) {
    score += 8;
    reasons.push('Đã sử dụng Solar Calculator');
  }

  if (input.phoneProvided) {
    score += 6;
    reasons.push('Đã cung cấp số điện thoại');
  }

  score = Math.min(100, score);
  const temperature: LeadTemperature = score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold';

  return { score, temperature, reasons, version: 'lead_scoring_v1' };
}
