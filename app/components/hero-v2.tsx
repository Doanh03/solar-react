"use client";

import { useEffect, useState } from "react";
import styles from "./hero-v2.module.css";

type Metric = { label: string; value: number; unit: string; step: number };
const baseMetrics: Metric[] = [
  { label: "Công suất lắp đặt", value: 202580.6, unit: "kWp", step: 0.1 },
  { label: "Tổng sản lượng tiêu thụ khách hàng", value: 1366671, unit: "kWh", step: 1 },
  { label: "Điện đang tích trữ", value: 319852, unit: "kWh", step: 1 },
  { label: "Doanh thu hôm nay", value: 1.95, unit: "tỷ", step: 0.01 },
  { label: "CO₂ giảm phát thải hôm nay", value: 433.2, unit: "tấn", step: 0.1 },
];
const nodes = ["HOME", "FACTORY", "BATTERY", "GRID"] as const;
type Node = (typeof nodes)[number];
const START_OUTPUT = 639_772;

function formatMetric(value: number, step: number) {
  return step < 1
    ? new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)
    : new Intl.NumberFormat("vi-VN").format(Math.round(value));
}

export default function HeroV2() {
  const [targetNode, setTargetNode] = useState<Node | null>(null);
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [metrics, setMetrics] = useState<number[]>(() => baseMetrics.map((metric) => metric.value));
  const [output, setOutput] = useState(START_OUTPUT);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOutput((value) => value + 1);
      setMetrics((values) => values.map((value, index) => value + baseMetrics[index].step));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let nodeIndex = 0;
    let glowTimer: number | undefined;
    let nextTimer: number | undefined;

    const clearTimers = () => {
      if (glowTimer !== undefined) window.clearTimeout(glowTimer);
      if (nextTimer !== undefined) window.clearTimeout(nextTimer);
    };

    const run = () => {
      const node = nodes[nodeIndex];
      setActiveNode(null);
      setTargetNode(node);
      setPulse((value) => value + 1);

      // First particle arrives at 2s; the icon glows exactly then.
      glowTimer = window.setTimeout(() => {
        setActiveNode(node);
      }, 2000);

      // Third particle arrives at 2.7s; keep a short pause before the next node.
      nextTimer = window.setTimeout(() => {
        nodeIndex = (nodeIndex + 1) % nodes.length;
        run();
      }, 3600);
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

      <div className={styles.planetStage} data-active={activeNode ?? "idle"} data-target={targetNode ?? "idle"} aria-label="Energy Planet">
        <div className={styles.atmosphere} />
        <div className={styles.planet}>
          <div className={styles.terminator} />
          <div className={styles.veins} />
          <div className={styles.core} />
          <span className={`${styles.orbit} ${styles.orbitA}`} />
          <span className={`${styles.orbit} ${styles.orbitB}`} />
        </div>

        {Array.from({ length: 3 }, (_, index) => (
          <span
            key={`${pulse}-${index}`}
            className={`${styles.energyTrailParticle} ${styles[`trail${targetNode ?? "HOME"}`]}`}
            style={{ ["--trail-delay" as string]: `${index * 350}ms` }}
            aria-hidden="true"
          />
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
        {baseMetrics.map((metric, index) => (
          <div className={styles.metric} key={metric.label}>
            <strong>{formatMetric(metrics[index], metric.step)}</strong><span>{metric.unit}</span>
            <small>{metric.label}</small>
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
