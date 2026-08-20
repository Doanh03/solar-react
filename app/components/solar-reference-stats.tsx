'use client';

import { createPortal } from 'react-dom';
import { useLayoutEffect, useState } from 'react';
import styles from './solar-reference-stats.module.css';
import heroStyles from './solar-home-v2.module.css';

type Metric = {
  value: string;
  unit?: string;
  label: string;
  icon: 'solar' | 'home' | 'battery' | 'revenue' | 'co2';
};

const metrics: Metric[] = [
  { value: '639.772', unit: 'kWh', label: 'SẢN LƯỢNG ĐIỆN MẶT TRỜI HÔM NAY', icon: 'solar' },
  { value: '202.580,6', unit: 'kWp', label: 'CÔNG SUẤT LẮP ĐẶT', icon: 'solar' },
  { value: '1.366.671', unit: 'kWh', label: 'TỔNG SẢN LƯỢNG TIÊU THỤ KHÁCH HÀNG', icon: 'home' },
  { value: '319.852', unit: 'kWh', label: 'ĐIỆN ĐANG TÍCH TRỮ', icon: 'battery' },
  { value: '1,95', unit: 'tỷ', label: 'DOANH THU HÔM NAY', icon: 'revenue' },
  { value: '433,2', unit: 'tấn', label: 'CO₂ GIẢM PHÁT THẢI HÔM NAY', icon: 'co2' },
];

function MetricIcon({ type }: { type: Metric['icon'] }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={styles.icon}>
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {type === 'solar' && <><circle cx="16" cy="16" r="5" /><path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3" /></>}
        {type === 'home' && <><path d="M4 15.5 16 5l12 10.5" /><path d="M7 14v13h18V14M12 27v-7h8v7" /><path d="M12 14h8l-2-3h-8z" /></>}
        {type === 'battery' && <><rect x="5" y="8" width="21" height="16" rx="3" /><path d="M26 13h2v6h-2M10 16h5M12.5 13.5v5M19 13.5v5" /></>}
        {type === 'revenue' && <><rect x="4" y="7" width="24" height="18" rx="3" /><circle cx="16" cy="16" r="4" /><path d="M8 11h.01M24 21h.01" /></>}
        {type === 'co2' && <><path d="M26 7c-8 0-14 3-16 9-1 4 1 8 6 10 1-7 4-12 10-15" /><path d="M6 25c3-5 7-8 13-9" /></>}
      </g>
    </svg>
  );
}

function MetricCard({ metric, className }: { metric: Metric; className: string }) {
  return (
    <article className={`${styles.card} ${className}`}>
      <span className={styles.iconBadge}><MetricIcon type={metric.icon} /></span>
      <span className={styles.label}>{metric.label}</span>
      <strong className={styles.value}>{metric.value}<small>{metric.unit}</small></strong>
    </article>
  );
}

export function SolarReferenceStats() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const commandCard = document.querySelector<HTMLElement>(`.${heroStyles.commandCard}`);
    if (!commandCard) return;

    commandCard.querySelectorAll<HTMLElement>(`.${heroStyles.stat}`).forEach((node) => {
      node.dataset.referenceHidden = 'true';
      node.style.display = 'none';
    });
    commandCard.querySelectorAll<HTMLElement>(`.${heroStyles.commandFooter}`).forEach((node) => {
      node.dataset.referenceHidden = 'true';
      node.style.display = 'none';
    });
    setTarget(commandCard);

    return () => {
      commandCard.querySelectorAll<HTMLElement>('[data-reference-hidden="true"]').forEach((node) => {
        node.style.display = '';
        delete node.dataset.referenceHidden;
      });
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <div className={styles.overlay} aria-label="Sáu chỉ số MT Solar">
      <MetricCard metric={metrics[0]} className={styles.main} />
      <MetricCard metric={metrics[1]} className={styles.topLeft} />
      <MetricCard metric={metrics[2]} className={styles.topRight} />
      <MetricCard metric={metrics[3]} className={styles.bottomLeft} />
      <MetricCard metric={metrics[4]} className={styles.bottomRight} />
      <MetricCard metric={metrics[5]} className={styles.bottomCenter} />
    </div>,
    target,
  );
}
