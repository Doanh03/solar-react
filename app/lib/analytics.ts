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

function getDevice(): 'mobile' | 'desktop' {
  return window.matchMedia('(max-width: 800px)').matches ? 'mobile' : 'desktop';
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
