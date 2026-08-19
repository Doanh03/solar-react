export const LEAD_SCORING_VERSION = 'lead_scoring_v1'

export function scoreLead(input = {}) {
  const bill = Number(input.monthlyBillVnd) || 0
  const roofArea = Number(input.roofAreaM2) || 0
  let score = 0
  const reasons = []

  if (bill >= 10_000_000) { score += 25; reasons.push('Hóa đơn từ 10 triệu/tháng') }
  else if (bill >= 5_000_000) { score += 18; reasons.push('Hóa đơn 5–<10 triệu/tháng') }
  else if (bill >= 2_000_000) { score += 10; reasons.push('Hóa đơn 2–<5 triệu/tháng') }
  else { score += 3; reasons.push('Hóa đơn dưới 2 triệu/tháng') }

  if (roofArea >= 100) { score += 20; reasons.push('Mái từ 100 m²') }
  else if (roofArea >= 50) { score += 14; reasons.push('Mái 50–<100 m²') }
  else if (roofArea >= 25) { score += 8; reasons.push('Mái 25–<50 m²') }

  if (input.solarType === 'hybrid' || input.solarType === 'battery') {
    score += 15
    reasons.push('Quan tâm hybrid/pin lưu trữ')
  }

  if (['office', 'factory', 'shop', 'farm'].includes(input.propertyType)) {
    score += 10
    reasons.push('Công trình kinh doanh')
  }

  if (input.calculatorUsed) { score += 5; reasons.push('Đã hoàn thành calculator') }
  if (input.quoteRequested) { score += 10; reasons.push('Đã yêu cầu báo giá') }

  const finalScore = Math.min(100, score)
  const temperature = finalScore >= 80 ? 'hot' : finalScore >= 50 ? 'warm' : 'cold'

  return { version: LEAD_SCORING_VERSION, score: finalScore, temperature, reasons }
}
