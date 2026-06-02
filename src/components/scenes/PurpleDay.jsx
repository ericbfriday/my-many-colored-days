import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./PurpleDay.module.css";

const text = "On purple days I'm sad. I groan. I drag my tail. I walk alone.";

function BeastSvg({ isSadClick }) {
  return (
    <svg viewBox="0 0 240 180" className={styles.beastSvg}>
      <defs>
        <linearGradient id="beastBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a0e78" />
          <stop offset="60%" stopColor="#300052" />
          <stop offset="100%" stopColor="#1c0032" />
        </linearGradient>
        <linearGradient id="beastLegGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b0060" />
          <stop offset="100%" stopColor="#1a002c" />
        </linearGradient>
      </defs>

      {/* BACK LEGS (rendered behind body) */}
      <path
        className={styles.legBackLeft}
        d="M 95,122 C 90,135 85,145 85,152 L 102,152 C 98,145 98,135 98,122 Z"
        fill="url(#beastLegGrad)"
        stroke="#0c0018"
        strokeWidth="1.5"
      />
      <path
        className={styles.legBackRight}
        d="M 185,122 C 180,135 175,145 175,152 L 192,152 C 188,145 188,135 188,122 Z"
        fill="url(#beastLegGrad)"
        stroke="#0c0018"
        strokeWidth="1.5"
      />

      {/* TAIL SEGMENT 3 (Dragging tip) */}
      <g className={styles.tailSeg3}>
        <path
          d="M 22,141 C 12,147 -2,152 -6,152 C -6,152 2,144 11,139 L 24,144 Z"
          fill="#2d004e"
          stroke="#0c0018"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      {/* TAIL SEGMENT 2 (Middle) */}
      <g className={styles.tailSeg2}>
        <path
          d="M 44,126 C 34,131 24,136 20,139 L 23,147 C 28,144 38,139 47,134 Z"
          fill="#3b0060"
          stroke="#0c0018"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      {/* TAIL SEGMENT 1 (Body connected) */}
      <g className={styles.tailSeg1}>
        <path
          d="M 65,115 C 55,118 45,122 41,125 L 44,133 C 49,130 59,126 68,122 Z"
          fill="#4a0e78"
          stroke="#0c0018"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      {/* MAIN BODY (Hunchback) */}
      <path
        d="M 65,115 C 60,92 78,52 130,52 C 172,52 188,82 182,120 C 170,132 100,132 65,115 Z"
        fill="url(#beastBodyGrad)"
        stroke="#0c0018"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Shaggy Fur Details */}
      <path d="M 90,62 Q 95,57 93,66" stroke="#5d1b91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 125,56 Q 130,51 128,60" stroke="#5d1b91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 160,65 Q 165,60 163,69" stroke="#5d1b91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 110,75 Q 115,70 113,79" stroke="#5d1b91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 145,82 Q 150,77 148,86" stroke="#5d1b91" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* FRONT LEGS (rendered in front of body) */}
      <path
        className={styles.legFrontLeft}
        d="M 85,122 C 80,135 75,145 75,152 L 95,152 C 90,145 90,135 90,122 Z"
        fill="url(#beastBodyGrad)"
        stroke="#0c0018"
        strokeWidth="2"
      />
      <path
        className={styles.legFrontRight}
        d="M 175,122 C 170,135 165,145 165,152 L 185,152 C 180,145 180,135 180,122 Z"
        fill="url(#beastBodyGrad)"
        stroke="#0c0018"
        strokeWidth="2"
      />

      {/* HEAD & NECK GROUP */}
      <g className={isSadClick ? styles.headGroupSlump : styles.headGroup}>
        {/* Neck */}
        <path
          d="M 158,78 C 172,72 188,85 188,105 L 173,110 C 168,95 158,86 158,78 Z"
          fill="url(#beastBodyGrad)"
          stroke="#0c0018"
          strokeWidth="2"
        />

        {/* Ear (drooping back) */}
        <path
          d="M 172,92 C 158,98 153,116 156,122 C 160,122 168,108 175,98 Z"
          fill="#2d004e"
          stroke="#0c0018"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Head/Face */}
        <path
          d="M 173,95 C 183,85 203,90 210,103 C 213,110 208,120 193,118 C 183,116 173,106 173,95 Z"
          fill="url(#beastBodyGrad)"
          stroke="#0c0018"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Sad Eye (Closed arc) */}
        <path
          d="M 188,101 Q 193,96 198,101"
          fill="none"
          stroke="#0c0018"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Smile (Sad drooping line) */}
        <path
          d="M 199,112 Q 192,109 188,111"
          fill="none"
          stroke="#0c0018"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// Generate stable raindrop locations and delays
const raindrops = Array.from({ length: 22 }).map((_, i) => ({
  id: `rain-${i}`,
  left: `${(i * 4.7) % 100}%`,
  top: `${-15 - (i * 7.3) % 25}%`,
  speed: 1.0 + (i % 6) * 0.15,
  delay: -(i * 0.28),
  height: 45 + (i % 4) * 12,
  opacity: 0.08 + (i % 3) * 0.04,
}));

export default function PurpleDay() {
  const [isSadClick, setIsSadClick] = useState(false);
  const [tears, setTears] = useState([]);
  const [dustPuffs, setDustPuffs] = useState([]);

  // Periodic tail scraping dust clouds
  useEffect(() => {
    if (isSadClick) return;

    const interval = setInterval(() => {
      const creatureEl = document.querySelector(`.${styles.creatureWalkContainer}`);
      if (creatureEl) {
        const rect = creatureEl.getBoundingClientRect();
        const pageRect = creatureEl.parentElement.getBoundingClientRect();
        
        // Tail tip coordinates at ground level
        const tailX = rect.left - pageRect.left + 5;
        const tailY = rect.bottom - pageRect.top - 18;
        
        const id = `dust-${Date.now()}-${Math.random()}`;
        setDustPuffs((prev) => [...prev, { id, x: tailX, y: tailY }]);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isSadClick]);

  // Click handler to trigger pause, slump, speech bubble, and tear splash
  const triggerSadAction = useCallback(() => {
    if (isSadClick) return;
    setIsSadClick(true);

    const creatureEl = document.querySelector(`.${styles.creatureWalkContainer}`);
    if (creatureEl) {
      const rect = creatureEl.getBoundingClientRect();
      const pageRect = creatureEl.parentElement.getBoundingClientRect();

      // Calculate eye position relative to parent page
      const eyeX = rect.left - pageRect.left + (rect.width * 0.72);
      const eyeY = rect.top - pageRect.top + (rect.height * 0.28);
      const groundY = rect.bottom - pageRect.top - 15;

      const tearId = `tear-${Date.now()}`;
      setTears((prev) => [...prev, { id: tearId, x: eyeX, y: eyeY, groundY }]);
    }

    // Stop pausing after 3.5 seconds
    setTimeout(() => {
      setIsSadClick(false);
    }, 3500);
  }, [isSadClick]);

  const removeTear = (id) => {
    setTears((prev) => prev.filter((t) => t.id !== id));
  };

  const removeDustPuff = (id) => {
    setDustPuffs((prev) => prev.filter((dp) => dp.id !== id));
  };

  return (
    <Page backgroundColor="linear-gradient(to bottom, #2b003a 0%, #11001e 100%)">
      <div className={styles.sceneContainer} onClick={triggerSadAction}>
        
        {/* Dark Vignette Overlay */}
        <div className={styles.vignette}></div>

        {/* Ambient Rain Particles */}
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

        {/* Background Fog Layer */}
        <div className={`${styles.fogLayer} ${styles.fog1}`}></div>

        {/* Title Text */}
        <AnimatedText text={text} className={styles.titleText} />

        {/* Ground Line */}
        <div className={styles.groundLine}></div>

        {/* Dragging Tail Dust Puffs */}
        {dustPuffs.map((dp) => (
          <motion.div
            key={dp.id}
            className={styles.dustPuff}
            initial={{ left: dp.x, top: dp.y, scale: 0.3, opacity: 0.65 }}
            animate={{
              scale: 1.5,
              opacity: 0,
              x: -20,
              y: -4,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => removeDustPuff(dp.id)}
          />
        ))}

        {/* Falling Tears & Splash Ripples */}
        {tears.map((t) => (
          <React.Fragment key={t.id}>
            {/* Tear */}
            <motion.div
              className={styles.tear}
              initial={{ left: t.x, top: t.y, opacity: 1, scale: 0.8 }}
              animate={{
                top: t.groundY,
                opacity: [1, 1, 0],
                scale: [0.8, 1, 0.4],
              }}
              transition={{ duration: 1.0, ease: "easeIn" }}
              onAnimationComplete={() => removeTear(t.id)}
            >
              <svg viewBox="0 0 10 15" width="8" height="12">
                <path d="M5,0 C5,0 10,7 10,11 A5,5 0 0,1 0,11 C0,7 5,0 5,0 Z" fill="#9d4edd" />
              </svg>
            </motion.div>

            {/* Ripple */}
            <motion.div
              className={styles.ripple}
              initial={{ left: t.x - 15, top: t.groundY - 5, scale: 0.1, opacity: 0 }}
              animate={{
                scale: 1.5,
                opacity: [0, 0.7, 0],
              }}
              transition={{ delay: 0.95, duration: 0.8, ease: "easeOut" }}
            />
          </React.Fragment>
        ))}

        {/* Plodding Beast Walk Loop */}
        <div
          className={`${styles.creatureWalkContainer} ${isSadClick ? styles.paused : ""}`}
        >
          <div className={styles.scaleWrapper}>
            <div className={styles.creatureInteractive}>
              
              <BeastSvg isSadClick={isSadClick} />

              {/* Speech bubble triggered on click */}
              <AnimatePresence>
                {isSadClick && (
                  <motion.div
                    className={styles.speechBubble}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Groan...
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Foreground Fog Layer (draws over walking feet) */}
        <div className={`${styles.fogLayer} ${styles.fog2}`}></div>

      </div>
    </Page>
  );
}
