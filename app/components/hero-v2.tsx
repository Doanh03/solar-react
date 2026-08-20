"use client";

import { useEffect, useState } from "react";
import styles from "./hero-v2.module.css";

const baseMetrics = [
  ["Công suất lắp đặt", 202580.6, "kWp", 0.1],
  ["Tổng sản lượng tiêu thụ khách hàng", 1366671, "kWh", 1],
  ["Điện đang tích trữ", 319852, "kWh", 1],
  ["Doanh thu hôm nay", 1.95, "tỷ", 0.01],
  ["CO₂ giảm phát thải hôm nay", 433.2, "tấn", 0.1],
] as const;

const nodes = ["HOME", "FACTORY", "BATTERY", "GRID"] as const;
const START_OUTPUT = 639_772;

function formatMetric(value: number, step: number) {
  return step < 1
    ? new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)
    : new Intl.NumberFormat("vi-VN").format(Math.round(value));
}

export default function HeroV2() {
  const [activeNode, setActiveNode] = useState<(typeof nodes)[number] | null>(null);
  const [metrics, setMetrics] = useState(baseMetrics.map(([, value]) => value));
  const [output, setOutput] = useState(START_OUTPUT);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOutput((value) => value + 1);
      setMetrics((values) => values.map((value, index) => value + baseMetrics[index][3]));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let nodeIndex = 0;
    let travelTimer: number | undefined;
    let pauseTimer: number | undefined;

    const clearTimers = () => {
      if (travelTimer) window.clearTimeout(travelTimer);
      if (pauseTimer) window.clearTimeout(pauseTimer);
    };

    const run = () => {
      const node = nodes[nodeIndex];
      setActiveNode(null);
      setPulse((value) => value + 1);

      travelTimer = window.setTimeout(() => {
        setActiveNode(node);
        pauseTimer = window.setTimeout(() => {
          nodeIndex = (nodeIndex + 1) % nodes.length;
          run();
        }, 1300);
      }, 1100);
    };

    run();
    return clearTimers;
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-v2-title">
      <div className={styles.copy}>
        <span className={styles.eyebrow}>SOLAR ENERGY · SMART INFRASTRUCTURE</span>
        <h1 id="hero-v2-title">Năng lượng sạch cho một tương lai bền vững.</h1>
        <p>Giải pháp điện mặt trời thông minh cho gia đình, doanh nghiệp và nhà xưởng.</p>
      </div>

      <div className={styles.planetStage} data-active={activeNode ?? "idle"} data-pulse={pulse} aria-label="Energy Planet">
        <div className={styles.atmosphere} />
        <div className={styles.planet}>
          <div className={styles.terminator} />
          <div className={styles.veins} />
          <div className={styles.core} />
          <span className={`${styles.orbit} ${styles.orbitA}`} />
          <span className={`${styles.orbit} ${styles.orbitB}`} />
        </div>

        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} className={styles.energyTrailParticle} style={{ ["--trail-delay" as string]: `${index * 90}ms` }} aria-hidden="true" />
        ))}

        {nodes.map((node) => (
          <div key={node} className={`${styles.node} ${activeNode === node ? styles.nodeActive : ""} ${styles[`node${node}`]}`}>
            <div className={styles.connection} />
            <div className={styles.icon} aria-hidden="true">
              {node === "HOME" && <svg viewBox="0 0 48 48"><path d="M7 22 24 8l17 14v17H29V28H19v11H7Z" /><path d="M12 20h24M16 16h16" /></svg>}
              {node === "FACTORY" && <svg viewBox="0 0 48 48"><path d="M5 39V23l11 5v-8l10 5v-8l17 9v13Z" /><path d="M10 33h5M21 33h5M32 33h5M9 39V15h7" /></svg>}
              {node === "BATTERY" && <svg viewBox="0 0 48 48"><rect x="9" y="12" width="29" height="25" rx="4" /><path d="M38 20h4v9h-4M16 20v9M22 20v9M28 20v9M34 20v9" /></svg>}
              {node === "GRID" && <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="5" /><circle cx="8" cy="12" r="3" /><circle cx="40" cy="12" r="3" /><circle cx="8" cy="36" r="3" /><circle cx="40" cy="36" r="3" /><path d="M20 21 10 14M28 21l10-7M20 27 10 34M28 27l10 7" /></svg>}
            </div>
            <span>{node}</span>
          </div>
        ))}

        <div className={styles.heroMetric}>
          <strong>{new Intl.NumberFormat("vi-VN").format(output)}</strong><span>kWh</span>
          <small>SẢN LƯỢNG ĐIỆN MẶT TRỜI HÔM NAY</small>
        </div>
      </div>

      <div className={styles.dataRail}>
        {baseMetrics.map(([label, , unit, step], index) => (
          <div className={styles.metric} key={label}>
            <strong>{formatMetric(metrics[index], step)}</strong><span>{unit}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <a href="#contact">NHẬN TƯ VẤN</a>
        <a href="#calculator">TÍNH TOÁN TIẾT KIỆM</a>
      </div>
    </section>
  );
}
