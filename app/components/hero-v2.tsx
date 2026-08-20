"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero-v2.module.css";

const metrics = [
  ["Công suất lắp đặt", "202.580,6", "kWp"],
  ["Tổng sản lượng tiêu thụ khách hàng", "1.366.671", "kWh"],
  ["Điện đang tích trữ", "319.852", "kWh"],
  ["Doanh thu hôm nay", "1,95", "tỷ"],
  ["CO₂ giảm phát thải hôm nay", "433,2", "tấn"],
] as const;

const nodes = ["HOME", "FACTORY", "BATTERY", "GRID"] as const;

export default function HeroV2() {
  const [activeNode, setActiveNode] = useState<(typeof nodes)[number] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let index = 0;
    const run = () => {
      setActiveNode(nodes[index]);
      timer.current = setTimeout(() => {
        setActiveNode(null);
        timer.current = setTimeout(() => {
          index = (index + 1) % nodes.length;
          run();
        }, 1200);
      }, 2200);
    };
    run();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-v2-title">
      <div className={styles.copy}>
        <span className={styles.eyebrow}>SOLAR ENERGY · SMART INFRASTRUCTURE</span>
        <h1 id="hero-v2-title">Năng lượng sạch cho một tương lai bền vững.</h1>
        <p>Giải pháp điện mặt trời thông minh cho gia đình, doanh nghiệp và nhà xưởng.</p>
      </div>

      <div className={`${styles.planetStage} ${activeNode ? styles.stageActive : ""}`} data-active={activeNode ?? "idle"} aria-label="Energy Planet">
        <div className={styles.atmosphere} />
        <div className={styles.planet}>
          <div className={styles.terminator} />
          <div className={styles.veins} />
          <div className={styles.core} />
          <span className={`${styles.orbit} ${styles.orbitA}`} />
          <span className={`${styles.orbit} ${styles.orbitB}`} />
        </div>

        <span className={`${styles.energyParticle} ${styles.energyHome}`} aria-hidden="true" />
        <span className={`${styles.energyParticle} ${styles.energyFactory}`} aria-hidden="true" />
        <span className={`${styles.energyParticle} ${styles.energyBattery}`} aria-hidden="true" />
        <span className={`${styles.energyParticle} ${styles.energyGrid}`} aria-hidden="true" />

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
          <strong>639.772</strong><span>kWh</span>
          <small>SẢN LƯỢNG ĐIỆN MẶT TRỜI HÔM NAY</small>
        </div>
      </div>

      <div className={styles.dataRail}>
        {metrics.map(([label, value, unit]) => (
          <div className={styles.metric} key={label}>
            <strong>{value}</strong><span>{unit}</span>
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
