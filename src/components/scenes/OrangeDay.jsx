import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./OrangeDay.module.css";

const text =
  "Then all of a sudden I'm a circus seal! On my orange days that's how I feel.";

// Framer Motion variants for the beach ball
const ballVariants = {
  idle: {
    y: [0, -8, 0],
    rotate: [0, 360],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },
  trick: {
    y: [0, -180, 0],
    rotate: [0, 720],
    transition: {
      duration: 1.4,
      ease: [0.15, 0.85, 0.35, 1], // Custom bezier for high toss and gravity descent
      times: [0, 0.45, 1],
    },
  },
};

// Framer Motion variants for the head/neck group
const headVariants = {
  idle: {
    rotate: [0, 2.5, -1, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  trick: {
    rotate: [0, -22, 8, 0],
    transition: {
      duration: 1.4,
      ease: "easeInOut",
      times: [0, 0.25, 0.75, 1],
    },
  },
};

// Framer Motion variants for the speech bubble
const bubbleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.1, 1],
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function OrangeDay() {
  const [isTricking, setIsTricking] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [particles, setParticles] = useState([]);

  // Spawn star/circle particles at specific coordinates
  const spawnParticles = useCallback((x, y) => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const speed = Math.random() * 90 + 50;
      return {
        id: Date.now() + "-" + i + "-" + Math.random(),
        x,
        y,
        targetX: Math.cos(angle) * speed,
        targetY: Math.sin(angle) * speed - (Math.random() * 30 + 10), // slight upward bias
        color: ["#ECC94B", "#FF6B6B", "#4DABF7", "#51CF66", "#FFFFFF"][
          Math.floor(Math.random() * 5)
        ],
        size: Math.random() * 14 + 8,
        type: ["star", "circle"][Math.floor(Math.random() * 2)],
        rotation: Math.random() * 360,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  // Trigger the trick when seal or ball is clicked/tapped
  const triggerTrick = useCallback(() => {
    if (isTricking) return;
    setIsTricking(true);
    setShowSpeech(true);

    // Spawn toss particles (near the nose/ball intersection)
    spawnParticles(250, 130);

    // Hide speech bubble after 1.1 seconds
    setTimeout(() => {
      setShowSpeech(false);
    }, 1100);

    // Spawn catch particles (ball meets nose again)
    setTimeout(() => {
      spawnParticles(250, 130);
    }, 1250);

    // End trick state
    setTimeout(() => {
      setIsTricking(false);
    }, 1400);
  }, [isTricking, spawnParticles]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Sparkles in background
  const sparkles = [
    { id: 1, className: `${styles.bgSparkle} ${styles.bgSparkle1}` },
    { id: 2, className: `${styles.bgSparkle} ${styles.bgSparkle2}` },
    { id: 3, className: `${styles.bgSparkle} ${styles.bgSparkle3}` },
    { id: 4, className: `${styles.bgSparkle} ${styles.bgSparkle4}` },
    { id: 5, className: `${styles.bgSparkle} ${styles.bgSparkle5}` },
  ];

  return (
    <Page backgroundColor="linear-gradient(135deg, #FF9F43 0%, #FF5252 100%)">
      {/* Background Sparkles */}
      {sparkles.map((s) => (
        <svg key={s.id} className={s.className} viewBox="0 0 24 24" width="20" height="20">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
        </svg>
      ))}

      <div className={styles.container}>
        <AnimatedText text={text} className={styles.titleText} />

        <div className={styles.sealScene} onClick={triggerTrick}>
          {/* SVG Canvas */}
          <svg
            viewBox="0 0 400 400"
            width="100%"
            height="100%"
            className={styles.sealSvg}
          >
            {/* Pedestal Shadow */}
            <ellipse cx="200" cy="385" rx="90" ry="10" fill="#B33939" opacity="0.4" />

            {/* Pedestal (Circus Stand) */}
            <g id="pedestal">
              {/* Pedestal Top Lid */}
              <ellipse cx="200" cy="320" rx="80" ry="12" fill="#E53E3E" stroke="#1A202C" strokeWidth="3" />
              
              {/* Pedestal Drum Body */}
              <path d="M 120,320 L 110,380 A 90,15 0 0,0 290,380 L 280,320 Z" fill="#E53E3E" stroke="#1A202C" strokeWidth="3" />
              
              {/* Pedestal Decorative Yellow/Cream Stripes */}
              <path d="M 148,322 L 138,379 L 158,380 L 163,322 Z" fill="#ECC94B" stroke="#1A202C" strokeWidth="1.5" />
              <path d="M 188,323 L 190,382 L 210,382 L 212,323 Z" fill="#ECC94B" stroke="#1A202C" strokeWidth="1.5" />
              <path d="M 237,322 L 242,380 L 262,379 L 252,322 Z" fill="#ECC94B" stroke="#1A202C" strokeWidth="1.5" />
            </g>

            {/* Seal Defs */}
            <defs>
              <linearGradient id="sealBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A5568" />
                <stop offset="60%" stopColor="#2D3748" />
                <stop offset="100%" stopColor="#1A202C" />
              </linearGradient>
              <linearGradient id="sealBellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A0AEC0" />
                <stop offset="100%" stopColor="#4A5568" />
              </linearGradient>
            </defs>

            {/* Seal Character Rig */}
            <g id="seal">
              {/* Tail Flippers */}
              <path
                d="M 125,305 C 100,312 70,300 50,312 C 45,300 52,288 65,296 C 70,280 85,288 95,300 Z"
                fill="url(#sealBodyGrad)"
                stroke="#1A202C"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Far Flipper (Behind Torso, animated clapping) */}
              <path
                className={isTricking ? styles.clappingFarFlipper : ""}
                d="M 132,262 C 122,258 112,272 115,288 C 120,298 132,298 138,286 Z"
                fill="#1A202C"
                stroke="#000000"
                strokeWidth="2"
              />

              {/* Main Torso */}
              <path
                d="M 120,310 C 130,285 145,245 180,240 C 205,238 215,265 210,310 C 185,312 135,312 120,310 Z"
                fill="url(#sealBodyGrad)"
                stroke="#1A202C"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Belly Shading Patch */}
              <path
                d="M 160,250 C 185,250 205,270 202,310 C 185,311 165,310 160,250 Z"
                fill="url(#sealBellyGrad)"
                opacity="0.3"
              />

              {/* Near Flipper (In front of Torso, animated clapping) */}
              <path
                className={isTricking ? styles.clappingFlipper : ""}
                d="M 185,275 C 205,280 215,295 210,305 C 198,308 185,295 180,285 Z"
                fill="url(#sealBodyGrad)"
                stroke="#1A202C"
                strokeWidth="2.5"
              />

              {/* Head & Neck Group (Bobbing / Tilting) */}
              <motion.g
                variants={headVariants}
                animate={isTricking ? "trick" : "idle"}
                style={{ transformOrigin: "180px 240px" }}
              >
                {/* Neck */}
                <path
                  d="M 175,242 C 172,210 185,180 200,165 C 215,180 212,215 208,242 Z"
                  fill="url(#sealBodyGrad)"
                  stroke="#1A202C"
                  strokeWidth="2.5"
                />
                {/* Head */}
                <path
                  d="M 190,168 C 180,150 190,125 210,120 C 230,115 245,135 240,155 C 235,170 210,175 190,168 Z"
                  fill="url(#sealBodyGrad)"
                  stroke="#1A202C"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Snout */}
                <path
                  d="M 225,123 C 235,123 250,132 250,140 C 250,148 235,152 225,145 Z"
                  fill="url(#sealBodyGrad)"
                  stroke="#1A202C"
                  strokeWidth="2.5"
                />
                {/* Cute Nose */}
                <circle cx="250" cy="138" r="5" fill="#111" />
                {/* Happy Eye */}
                {isTricking ? (
                  <path d="M 205,142 Q 212,135 218,142" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                ) : (
                  <>
                    <circle cx="212" cy="142" r="6" fill="#FFF" />
                    <circle cx="210" cy="141" r="3.5" fill="#1A202C" />
                    <circle cx="208" cy="139" r="1.5" fill="#FFF" />
                  </>
                )}
                {/* Smile */}
                <path d="M 235,145 Q 242,148 245,143" fill="none" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
                {/* Whiskers */}
                <line x1="242" y1="144" x2="255" y2="142" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="242" y1="146" x2="256" y2="147" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="241" y1="148" x2="253" y2="152" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
              </motion.g>
            </g>

            {/* Beach Ball (Balanced on Nose, spins and tosses) */}
            <motion.g
              variants={ballVariants}
              animate={isTricking ? "trick" : "idle"}
              style={{ transformOrigin: "250px 95px" }}
            >
              {/* Ball Base Circle */}
              <circle cx="250" cy="95" r="32" fill="#E53E3E" stroke="#1A202C" strokeWidth="2.5" />
              
              {/* Ball Slices (Beach Ball Design) */}
              <path d="M 250,95 L 282,95 A 32,32 0 0,1 266,122.7 Z" fill="#E53E3E" />
              <path d="M 250,95 L 266,122.7 A 32,32 0 0,1 234,122.7 Z" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1" />
              <path d="M 250,95 L 234,122.7 A 32,32 0 0,1 218,95 Z" fill="#3182CE" />
              <path d="M 250,95 L 218,95 A 32,32 0 0,1 234,67.3 Z" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1" />
              <path d="M 250,95 L 234,67.3 A 32,32 0 0,1 266,67.3 Z" fill="#ECC94B" />
              <path d="M 250,95 L 266,67.3 A 32,32 0 0,1 282,95 Z" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1" />
              
              {/* Ball Center Cap */}
              <circle cx="250" cy="95" r="6" fill="#FFF" stroke="#1A202C" strokeWidth="1.5" />
              
              {/* Ball Outer Boundary Rim */}
              <circle cx="250" cy="95" r="32" fill="none" stroke="#1A202C" strokeWidth="2.5" />

              {/* Glossy Overlay Highlight */}
              <path d="M 230,75 A 25,25 0 0,1 270,75 A 32,32 0 0,0 230,75 Z" fill="#FFF" opacity="0.3" />
            </motion.g>
          </svg>

          {/* Interactive particles container */}
          <div className={styles.particleContainer}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.particle}
                initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.4, rotate: 0 }}
                animate={{
                  x: p.targetX,
                  y: p.targetY,
                  opacity: 0,
                  scale: [0.4, 1.2, 0],
                  rotate: p.rotation + 360,
                }}
                transition={{ duration: 1.0, ease: "easeOut" }}
              >
                {p.type === "star" ? (
                  <svg
                    viewBox="0 0 24 24"
                    width={p.size}
                    height={p.size}
                    fill={p.color}
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.855 1.4-8.168L.132 9.21l8.2-1.192z" />
                  </svg>
                ) : (
                  <div
                    style={{
                      width: p.size,
                      height: p.size,
                      borderRadius: "50%",
                      backgroundColor: p.color,
                      boxShadow: `0 0 6px ${p.color}`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Speech bubble trigger */}
          <AnimatePresence>
            {showSpeech && (
              <motion.div
                className={styles.speechBubble}
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                Arf! Arf!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Page>
  );
}
