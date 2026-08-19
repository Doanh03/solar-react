const SOURCE_MAP = {
  facebook: 'facebook',
  fb: 'facebook',
  meta: 'facebook',
  google: 'google',
  googleads: 'google',
  seo: 'seo',
  direct: 'direct',
  referral: 'referral',
}

export function normalizeSource(value) {
  const normalized = String(value || '').trim().toLowerCase()
  return SOURCE_MAP[normalized] || 'other'
}

export function readAttribution(search = '') {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    normalizedSource: normalizeSource(params.get('utm_source')),
    landingPage: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  }
}
