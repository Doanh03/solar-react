export type MarketingSource = 'facebook' | 'google' | 'seo' | 'direct' | 'referral' | 'other';

export type AttributionParams = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
};

export type Attribution = AttributionParams & {
  source: MarketingSource;
  capturedAt: string;
};

function normalizeSource(value?: string | null): MarketingSource {
  const source = value?.trim().toLowerCase();
  if (!source) return 'direct';
  if (['facebook', 'fb', 'meta', 'instagram'].includes(source)) return 'facebook';
  if (['google', 'googleads', 'gads'].includes(source)) return 'google';
  if (['seo', 'organic'].includes(source)) return 'seo';
  if (['direct', 'none'].includes(source)) return 'direct';
  if (['referral', 'ref'].includes(source)) return 'referral';
  return 'other';
}

export function captureAttribution(params: AttributionParams, now = new Date()): Attribution {
  return {
    ...params,
    source: normalizeSource(params.utm_source),
    capturedAt: now.toISOString(),
  };
}

export function getAttributionFromSearch(search: string, landingPage?: string, referrer?: string): Attribution {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  return captureAttribution({
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
    landingPage,
    referrer,
  });
}
