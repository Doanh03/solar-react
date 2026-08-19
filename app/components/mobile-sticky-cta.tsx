'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/app/lib/analytics';

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const impressionTracked = useRef(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!visible || impressionTracked.current) return;
    impressionTracked.current = true;
    trackEvent('mobile_sticky_cta_impression', { section: 'mobile_sticky_cta', cta_id: 'mobile-sticky-calculator' });
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="mobile-sticky-cta">
      <a
        className="button button-primary"
        href="#calculator"
        onClick={() => trackEvent('mobile_sticky_cta_click', { section: 'mobile_sticky_cta', cta_id: 'mobile-sticky-calculator' })}
      >
        Tính hệ thống miễn phí
      </a>
    </div>
  );
}
