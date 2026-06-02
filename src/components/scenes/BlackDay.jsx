import React, { useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Page from "../Page";
import styles from "./BlackDay.module.css";

function CloudSvg({ className, onClick }) {
  return (
    <svg
      className={`${styles.cloud} ${className}`}
      viewBox="0 0 200 110"
      onClick={onClick}
    >
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#373742" />
          <stop offset="60%" stopColor="#1f1f26" />
          <stop offset="100%" stopColor="#101014" />
        </linearGradient>
      </defs>
      <path
        d="M 30,80 A 30,30 0 0,1 60,30 A 45,45 0 0,1 140,25 A 35,35 0 0,1 185,60 A 30,30 0 0,1 170,95 H 30 A 25,25 0 0,1 30,80 Z"
        fill="url(#cloudGrad)"
      />
    </svg>
  );
}

function BeastWolfSvg({ isHowling }) {
  return (
    <svg viewBox="0 0 200 200" className={styles.wolfSvg}>
      <defs>
        <linearGradient id="wolfBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#212127" />
          <stop offset="70%" stopColor="#15151a" />
          <stop offset="100%" stopColor="#0a0a0d" />
        </linearGradient>
        <linearGradient id="wolfChestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#282830" />
          <stop offset="100%" stopColor="#141417" />
        </linearGradient>
      </defs>

      {/* Tail (spiky) */}
      <path
        d="M 38,155 C 15,155 5,135 10,105 C 18,125 30,140 45,150 Z"
        fill="#121215"
        stroke="#060608"
        strokeWidth="1.5"
      />

      {/* Back layers (furthest legs/hip) */}
      <path
        d="M 40,180 C 40,140 65,135 75,145 C 80,155 80,165 75,180 Z"
        fill="#111114"
        stroke="#060608"
        strokeWidth="1.5"
      />
      <path
        d="M 94,142 L 94,180 L 106,180 L 104,142 Z"
        fill="#111114"
        stroke="#060608"
        strokeWidth="1.5"
      />

      {/* Main Body */}
      <path
        d="M 60,150 C 70,135 90,130 115,140 L 110,180 L 50,180 Z"
        fill="url(#wolfBodyGrad)"
        stroke="#060608"
        strokeWidth="2"
      />

      {/* Animated Breathing Chest */}
      <path
        className={styles.wolfChest}
        d="M 110,140 C 122,140 135,148 135,165 L 120,180 Z"
        fill="url(#wolfChestGrad)"
        stroke="#060608"
        strokeWidth="2"
      />

      {/* Front leg (closest) */}
      <path
        d="M 115,140 L 115,180 L 128,180 L 125,140 Z"
        fill="url(#wolfBodyGrad)"
        stroke="#060608"
        strokeWidth="2"
      />

      {/* Animated Head Group (tilts back) */}
      <g className={`${styles.wolfHead} ${isHowling ? styles.wolfHeadHowling : ""}`}>
        {/* Neck */}
        <path
          d="M 102,140 C 105,110 115,90 125,90 C 135,90 132,125 125,140 Z"
          fill="url(#wolfBodyGrad)"
          stroke="#060608"
          strokeWidth="2"
        />

        {/* Back neck spikes */}
        <path
          d="M 104,120 L 92,115 L 106,105 L 95,98 L 110,92 Z"
          fill="url(#wolfBodyGrad)"
          stroke="#060608"
          strokeWidth="2"
        />

        {/* Ear */}
        <path
          d="M 115,90 L 102,60 L 122,78 Z"
          fill="url(#wolfBodyGrad)"
          stroke="#060608"
          strokeWidth="2"
        />

        {/* Head/Face (snout) */}
        <path
          d="M 122,90 C 132,80 158,74 172,76 C 175,78 168,85 152,88 C 142,91 134,96 136,102 Z"
          fill="url(#wolfBodyGrad)"
          stroke="#060608"
          strokeWidth="2"
        />

        {/* Animated Lower Jaw */}
        <g className={`${styles.wolfJaw} ${isHowling ? styles.wolfJawHowling : ""}`}>
          <path
            d="M 136,102 L 156,96 L 151,104 C 145,106 138,105 136,102 Z"
            fill="url(#wolfBodyGrad)"
            stroke="#060608"
            strokeWidth="1.8"
          />
        </g>

        {/* Glowing Red Eye */}
        <path
          d="M 136,83 C 140,81 144,83 145,86"
          fill="none"
          stroke="#ff3b30"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// Generate stable raindrops coordinates
const raindrops = Array.from({ length: 30 }).map((_, i) => ({
  id: `rain-${i}`,
  left: `${(i * 3.7) % 100}%`,
  top: `${-15 - (i * 9.3) % 25}%`,
  speed: 0.55 + (i % 5) * 0.08,
  delay: -(i * 0.14),
  height: 60 + (i % 4) * 18,
  opacity: 0.12 + (i % 3) * 0.04,
}));

// Pre-drawn jagged lightning bolt SVGs
const lightningBolts = [
  <path d="M 90,0 L 110,120 L 70,220 L 130,340 L 50,480 L 100,600" className={styles.lightningPath} key="b1" />,
  <path d="M 120,0 L 90,100 L 140,190 L 70,300 L 120,440 L 40,580" className={styles.lightningPath} key="b2" />,
  <path d="M 60,0 L 90,90 L 55,180 L 115,280 L 45,410 L 90,560" className={styles.lightningPath} key="b3" />
];

export default function BlackDay() {
  const [isHowling, setIsHowling] = useState(false);
  const [isThundering, setIsThundering] = useState(false);
  const [lightningX, setLightningX] = useState(0);
  const [lightningBolt, setLightningBolt] = useState(null);
  const [soundwaves, setSoundwaves] = useState([]);

  // Spawn visual sound wave rings
  const spawnSoundwaves = (x, y) => {
    const id = Date.now();
    const waves = Array.from({ length: 3 }).map((_, i) => ({
      id: `wave-${id}-${i}`,
      x,
      y,
      delay: i * 0.22,
    }));
    setSoundwaves((prev) => [...prev, ...waves]);
  };

  const removeSoundwave = (id) => {
    setSoundwaves((prev) => prev.filter((sw) => sw.id !== id));
  };

  // Trigger lightning flash & rumble
  const triggerLightning = useCallback((clickX) => {
    if (isThundering) return;
    setIsThundering(true);

    // Center the bolt (container width is 180px)
    setLightningX(clickX - 90);
    setLightningBolt(Math.floor(Math.random() * 3));

    setTimeout(() => {
      setIsThundering(false);
      setLightningBolt(null);
    }, 450);
  }, [isThundering]);

  // Click handler for the wolf (howling triggers surrounding thunder)
  const triggerWolfHowl = () => {
    if (isHowling) return;
    setIsHowling(true);

    const wolfEl = document.querySelector(`.${styles.wolfContainer}`);
    if (wolfEl) {
      const rect = wolfEl.getBoundingClientRect();
      const pageRect = wolfEl.parentElement.getBoundingClientRect();

      // Emit soundwaves near mouth
      const mouthX = rect.left - pageRect.left + 160;
      const mouthY = rect.top - pageRect.top + 70;
      spawnSoundwaves(mouthX, mouthY);

      // Trigger a dramatic response strike slightly to the right
      setTimeout(() => {
        triggerLightning(rect.left - pageRect.left + 220);
      }, 150);
    }

    setTimeout(() => {
      setIsHowling(false);
    }, 2200);
  };

  return (
    <Page backgroundColor="linear-gradient(180deg, #09090b 0%, #161a1d 100%)">
      <div className={styles.sceneContainer}>
        
        {/* Full-screen strobe lightning flash overlay */}
        <div className={`${styles.lightningFlash} ${isThundering ? styles.flashActive : ""}`}></div>

        {/* Shake Wrapper around elements */}
        <div className={`${styles.shakeWrapper} ${isThundering ? styles.shakeActive : ""}`}>
          
          {/* Heavy Driving Rain */}
          {raindrops.map((r) => (
            <div
              key={r.id}
              className={styles.rainDrop}
              style={{
                left: r.left,
                top: r.top,
                height: `${r.height}px`,
                opacity: r.opacity,
                animationDuration: `${r.speed}s`,
                animationDelay: `${r.delay}s`,
              }}
            />
          ))}

          {/* Interactive Cloud Layer */}
          <CloudSvg
            className={styles.cloud1}
            onClick={(e) => {
              e.stopPropagation();
              const pageRect = e.currentTarget.parentElement.getBoundingClientRect();
              triggerLightning(e.clientX - pageRect.left);
            }}
          />
          <CloudSvg
            className={styles.cloud2}
            onClick={(e) => {
              e.stopPropagation();
              const pageRect = e.currentTarget.parentElement.getBoundingClientRect();
              triggerLightning(e.clientX - pageRect.left);
            }}
          />
          <CloudSvg
            className={styles.cloud3}
            onClick={(e) => {
              e.stopPropagation();
              const pageRect = e.currentTarget.parentElement.getBoundingClientRect();
              triggerLightning(e.clientX - pageRect.left);
            }}
          />

          {/* Jagged Lightning Strikes */}
          {lightningBolt !== null && (
            <div
              className={styles.lightningBoltContainer}
              style={{ left: `${lightningX}px` }}
            >
              <svg viewBox="0 0 180 600" width="100%" height="100%">
                {lightningBolts[lightningBolt]}
              </svg>
            </div>
          )}

          {/* Headline Typography highlighting MAD and LOUD */}
          <h1 className={styles.titleText}>
            Then come my black days,{" "}
            <span
              className={`${styles.highlightWord} ${styles.madWord} ${
                isThundering || isHowling ? styles.shakeWord : ""
              }`}
            >
              MAD
            </span>{" "}
            and{" "}
            <span
              className={`${styles.highlightWord} ${styles.loudWord} ${
                isThundering || isHowling ? styles.glowWord : ""
              }`}
            >
              LOUD
            </span>
            . I howl, I growl at every cloud.
          </h1>

          {/* Rocky Cliff Silhouette */}
          <svg className={styles.cliff} viewBox="0 0 320 80" preserveAspectRatio="none">
            <path d="M 0,80 L 160,50 L 220,55 L 250,80 H 320 V 80 H 0 Z" fill="#0c0c10" />
          </svg>

          {/* Howling sound wave circles */}
          {soundwaves.map((sw) => (
            <motion.div
              key={sw.id}
              className={styles.soundwave}
              initial={{ left: sw.x, top: sw.y, width: 0, height: 0, opacity: 0.9, x: "-50%", y: "-50%" }}
              animate={{
                width: [0, 220],
                height: [0, 220],
                opacity: [0.9, 0],
              }}
              transition={{ duration: 1.1, ease: "easeOut", delay: sw.delay }}
              onAnimationComplete={() => removeSoundwave(sw.id)}
            />
          ))}

          {/* Howling Wolf Rig */}
          <div className={styles.wolfContainer}>
            <div className={styles.wolfInteractive} onClick={triggerWolfHowl}>
              <BeastWolfSvg isHowling={isHowling} />
            </div>
          </div>

        </div>

      </div>
    </Page>
  );
}
