export type AnalyticsEventName =
  | 'hero_cta_clicked'
  | 'calculator_started'
  | 'calculator_completed'
  | 'lead_form_started'
  | 'lead_form_step_completed'
  | 'lead_phone_reached'
  | 'lead_submitted'
  | 'mobile_sticky_cta_impression'
  | 'mobile_sticky_cta_click';

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

const FIRST_TOUCH_KEY = 'solar_first_touch_v1';

function getDevice(): 'mobile' | 'desktop' {
  return window.matchMedia('(max-width: 800px)').matches ? 'mobile' : 'desktop';
}

function getMarketingContext(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const current = {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? '',
  };

  try {
    const existing = window.sessionStorage.getItem(FIRST_TOUCH_KEY);
    if (!existing && Object.values(current).some(Boolean)) {
      window.sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current));
    }
    const firstTouch = existing ? (JSON.parse(existing) as Record<string, string>) : current;
    return {
      ...firstTouch,
      last_touch_utm_source: current.utm_source,
      last_touch_utm_medium: current.utm_medium,
      last_touch_utm_campaign: current.utm_campaign,
      last_touch_utm_content: current.utm_content,
      last_touch_utm_term: current.utm_term,
    };
  } catch {
    return current;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === 'undefined') return;

  const event = {
    event: eventName,
    event_version: 'v1',
    page: window.location.pathname,
    device: getDevice(),
    ...getMarketingContext(),
    timestamp: new Date().toISOString(),
    ...payload,
  };

  const analyticsWindow = window as DataLayerWindow;
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push(event);

  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', event);
  }
}
