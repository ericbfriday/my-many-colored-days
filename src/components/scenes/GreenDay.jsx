import React, { useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./GreenDay.module.css";

const text = "Green days. Deep, deep in the sea. Cool and quiet fish. That's me.";

function Seaweed({ width = 45, height = 300, color = "#005f43", className }) {
  return (
    <svg
      className={`${styles.seaweed} ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      preserveAspectRatio="none"
    >
      <path
        d={`M ${width / 2},${height} 
           C ${width * 0.05},${height * 0.8} ${width * 0.95},${height * 0.6} ${width / 2},${height * 0.4} 
           C ${width * 0.05},${height * 0.2} ${width * 0.95},0 ${width * 0.55},0 
           C ${width * 0.85},0 ${width * 0.15},${height * 0.2} ${width / 2},${height * 0.4} 
           C ${width * 0.05},${height * 0.6} ${width * 0.95},${height * 0.8} ${width / 2},${height}`}
        fill={color}
      />
    </svg>
  );
}

function FishSvg({ className, fillBodyGrad = "fishBodyGrad", fillFinGrad = "fishFinGrad" }) {
  return (
    <svg viewBox="0 0 200 120" className={`${styles.fishSvg} ${className || ""}`}>
      <defs>
        <linearGradient id={fillBodyGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#80ffdb" />
          <stop offset="50%" stopColor="#2ec4b6" />
          <stop offset="100%" stopColor="#0f9f90" />
        </linearGradient>
        <linearGradient id={fillFinGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5d4" />
          <stop offset="100%" stopColor="#007f5f" />
        </linearGradient>
      </defs>

      <path
        d="M 115,44 C 100,15 75,20 80,49 Z"
        fill={`url(#${fillFinGrad})`}
        stroke="#004d34"
        strokeWidth="1.5"
      />

      <g className={styles.tailFinGroup}>
        <path
          d="M 55,60 C 40,42 22,30 14,38 C 7,44 14,53 21,58 C 14,63 7,72 14,78 C 22,86 40,78 55,60 Z"
          fill={`url(#${fillFinGrad})`}
          stroke="#004d34"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>

      <path
        d="M 160,60 C 135,38 85,38 60,57 C 52,60 52,60 60,63 C 85,82 135,82 160,60 Z"
        fill={`url(#${fillBodyGrad})`}
        stroke="#004d34"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M 125,50 Q 120,60 125,70"
        fill="none"
        stroke="#004d34"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 119,53 Q 115,60 119,67"
        fill="none"
        stroke="#004d34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        className={styles.pectoralFin}
        d="M 110,65 C 100,75 88,82 92,72 C 95,62 105,60 110,65 Z"
        fill={`url(#${fillFinGrad})`}
        stroke="#004d34"
        strokeWidth="1.5"
      />

      <circle cx="142" cy="52" r="7" fill="white" stroke="#004d34" strokeWidth="1" />
      <circle cx="144" cy="52" r="3.5" fill="#004d34" />
      <circle cx="146" cy="50" r="1.2" fill="white" />

      <path
        d="M 154,62 Q 148,67 144,63"
        fill="none"
        stroke="#004d34"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Framer Motion variants for the main fish's local trick (loop-de-loop flip)
const fishClickVariants = {
  idle: {
    y: [0, -6, 0],
    transition: {
      y: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  clickAnim: {
    rotate: [0, -15, -360, -360],
    x: [0, -35, 70, 0],
    y: [0, 15, -60, 0],
    transition: {
      duration: 1.6,
      ease: "easeInOut",
      times: [0, 0.2, 0.7, 1],
    },
  },
};

export default function GreenDay() {
  const [isClickAnimating, setIsClickAnimating] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  const ambientBubbles = [
    { id: "amb-1", left: "6%", size: 18, duration: 16, delay: 0 },
    { id: "amb-2", left: "32%", size: 10, duration: 22, delay: 3, wobble: styles.wobbleB },
    { id: "amb-3", left: "55%", size: 24, duration: 14, delay: 1 },
    { id: "amb-4", left: "70%", size: 14, duration: 19, delay: 5, wobble: styles.wobbleB },
    { id: "amb-5", left: "92%", size: 20, duration: 17, delay: 2 },
  ];

  // Spawn bubbles at specific coordinates (used for water click & fish trick)
  const spawnBubbles = useCallback((x, y, count = 6, isFishBubbles = false) => {
    const newBubbles = Array.from({ length: count }).map((_, i) => {
      const id = `${isFishBubbles ? "fish" : "click"}-bubble-${Date.now()}-${i}-${Math.random()}`;
      const size = isFishBubbles 
        ? Math.random() * 8 + 5   // Fish bubbles are smaller (5px to 13px)
        : Math.random() * 18 + 8; // Click bubbles are larger (8px to 26px)
      const duration = isFishBubbles 
        ? Math.random() * 1.5 + 1.2  // Fish bubbles rise faster
        : Math.random() * 3 + 2.5;   // Click bubbles rise slower
      const delay = isFishBubbles ? i * 0.06 : Math.random() * 0.3; // Fish bubbles stream out sequentially
      
      // Spread them slightly around the source coordinate
      const spreadX = isFishBubbles ? 5 : 20;
      const spreadY = isFishBubbles ? 5 : 12;
      const startX = x + (Math.random() * spreadX * 2 - spreadX);
      const startY = y + (Math.random() * spreadY * 2 - spreadY);
      const wobbleType = Math.random() > 0.5 ? styles.wobbleA : styles.wobbleB;

      return {
        id,
        x: startX,
        y: startY,
        size,
        duration,
        delay,
        wobbleType,
        popping: false
      };
    });

    setBubbles((prev) => [...prev, ...newBubbles]);
  }, []);

  // Handle water clicks to spawn normal bubbles
  const handlePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnBubbles(x, y, Math.floor(Math.random() * 4) + 4);
  };

  // Click handler for the main fish
  const triggerFishClick = () => {
    if (isClickAnimating) return;
    setIsClickAnimating(true);

    // Calculate mouth position dynamically to release a stream of bubble trail!
    const swimEl = document.querySelector(`.${styles.mainFishSwimContainer}`);
    if (swimEl) {
      const rect = swimEl.getBoundingClientRect();
      const pageRect = swimEl.parentElement.getBoundingClientRect();
      
      // Facing right, so mouth is at right edge, vertical center
      const mouthX = rect.right - pageRect.left - 20;
      const mouthY = rect.top - pageRect.top + (rect.height / 2);
      
      // Spawn 10 small trail bubbles
      spawnBubbles(mouthX, mouthY, 10, true);
    }

    // Reset animation state when completed (1.6s matched to CSS transition)
    setTimeout(() => {
      setIsClickAnimating(false);
    }, 1600);
  };

  // Pop a bubble on hover
  const handleBubblePop = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popping: true } : b))
    );
  };

  // Remove popped bubble from DOM
  const removeBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <Page backgroundColor="linear-gradient(to bottom, #004b39 0%, #001b14 100%)">
      <div className={styles.sceneContainer} onClick={handlePageClick}>
        
        {/* Shimmering God Rays */}
        <div className={styles.lightRays}>
          <div className={`${styles.ray} ${styles.ray1}`}></div>
          <div className={`${styles.ray} ${styles.ray2}`}></div>
          <div className={`${styles.ray} ${styles.ray3}`}></div>
        </div>

        {/* Ambient Infinite Bubbles (Background) */}
        {ambientBubbles.map((ab) => (
          <div
            key={ab.id}
            className={styles.ambientBubbleContainer}
            style={{
              left: ab.left,
              animationDuration: `${ab.duration}s`,
              animationDelay: `${ab.delay}s`,
            }}
          >
            <div
              className={`${styles.bubble} ${ab.wobble || styles.wobbleA}`}
              style={{
                width: `${ab.size}px`,
                height: `${ab.size}px`,
              }}
            />
          </div>
        ))}

        <AnimatedText text={text} className={styles.titleText} />

        {/* BACKGROUND SEAWEED */}
        <Seaweed width={48} height={380} color="#003d2b" className={styles.seaweedBg1} />
        <Seaweed width={40} height={280} color="#003525" className={styles.seaweedBg2} />

        {/* COMPANION PARALLAX FISH 1 (Background, swims right-to-left) */}
        <div className={styles.companionFish1}>
          <FishSvg fillBodyGrad="compBodyGrad1" fillFinGrad="compFinGrad1" />
        </div>

        {/* MAIN CHARACTER FISH */}
        <div className={styles.mainFishSwimContainer}>
          <motion.div
            className={styles.mainFishInteractionContainer}
            animate={isClickAnimating ? "clickAnim" : "idle"}
            variants={fishClickVariants}
            onClick={(e) => {
              e.stopPropagation(); // Avoid spawning click bubble at fish location
              triggerFishClick();
            }}
          >
            <FishSvg fillBodyGrad="mainBodyGrad" fillFinGrad="mainFinGrad" />
          </motion.div>
        </div>

        {/* COMPANION PARALLAX FISH 2 (Background, swims left-to-right) */}
        <div className={styles.companionFish2}>
          <FishSvg fillBodyGrad="compBodyGrad2" fillFinGrad="compFinGrad2" />
        </div>

        {/* FOREGROUND SEAWEED */}
        <Seaweed width={52} height={220} color="#005f43" className={styles.seaweedFg1} />
        <Seaweed width={42} height={260} color="#007f5f" className={styles.seaweedFg2} />

        {/* INTERACTIVE CLICK-SPAWNED BUBBLES */}
        {bubbles.map((b) => (
          <div
            key={b.id}
            className={styles.clickBubbleContainer}
            style={{
              left: b.x,
              top: b.y,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
             onAnimationEnd={() => {
               // Remove when floatUp finishes
               if (!b.popping) {
                 removeBubble(b.id);
               }
             }}
          >
            <div
              className={`${styles.bubble} ${b.popping ? styles.bubblePop : b.wobbleType}`}
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
              }}
              onMouseEnter={() => handleBubblePop(b.id)}
               onAnimationEnd={() => {
                 // Remove when bubblePop keyframes finish
                 if (b.popping) {
                   removeBubble(b.id);
                 }
               }}
            />
          </div>
        ))}

      </div>
    </Page>
  );
}
