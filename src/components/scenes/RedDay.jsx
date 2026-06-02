import React, { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./RedDay.module.css";

const text =
  "On bright red days how good it feels to be a horse and kick my heels!";

// Framer Motion variants for different horse parts
const horseBodyVariants = {
  idle: {
    y: [0, -3, 0],
    rotate: 0,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  kick: {
    y: [0, 6, -18, 0],
    rotate: [0, -4, 18, 18, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      times: [0, 0.25, 0.45, 0.75, 1],
    },
  },
};

const backLeftLegVariants = {
  idle: {
    rotate: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
  kick: {
    rotate: [0, -12, 70, 70, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      times: [0, 0.25, 0.45, 0.75, 1],
    },
  },
};

const backRightLegVariants = {
  idle: {
    rotate: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
  kick: {
    rotate: [0, -8, 62, 62, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      times: [0, 0.22, 0.42, 0.75, 1],
    },
  },
};

const tailVariants = {
  idle: {
    rotate: [0, 8, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  kick: {
    rotate: [0, -25, 45, 45, -15, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      times: [0, 0.2, 0.45, 0.7, 0.85, 1],
    },
  },
};

const headNeckVariants = {
  idle: {
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  kick: {
    rotate: [0, 6, -16, -16, 2, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      times: [0, 0.25, 0.45, 0.75, 0.9, 1],
    },
  },
};

const earVariants = {
  idle: {
    rotate: [0, 3, -3, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  kick: {
    rotate: [0, -10, 8, -8, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const eyeVariants = {
  blink: {
    scaleY: [1, 0.1, 1],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: 3.5,
    },
  },
};

export default function RedDay() {
  const [isKicking, setIsKicking] = useState(false);
  const [particles, setParticles] = useState([]);

  // Spawn particles at the peak of the kick
  const triggerKick = useCallback(() => {
    if (isKicking) return;
    setIsKicking(true);

    // Peak of the kick is around 450ms into the animation
    setTimeout(() => {
      const newParticles = Array.from({ length: 18 }).map((_, i) => {
        // Particles burst upwards and backwards (to the right since horse faces left)
        const angle = (Math.random() * 80 - 30) * (Math.PI / 180); // -30 to 50 degrees
        const speed = Math.random() * 200 + 100;
        return {
          id: Date.now() + "-" + i,
          x: 0,
          y: 0,
          targetX: Math.cos(angle) * speed,
          targetY: -Math.sin(angle) * speed - (Math.random() * 60 + 40),
          color: ["#FFD700", "#FF69B4", "#00FFFF", "#FF9F43", "#FFFFFF"][
            Math.floor(Math.random() * 5)
          ],
          size: Math.random() * 16 + 10,
          type: ["star", "cloud", "circle"][Math.floor(Math.random() * 3)],
          rotation: Math.random() * 360,
        };
      });
      setParticles((prev) => [...prev, ...newParticles]);
    }, 450);

    // Reset kicking state after animation duration (1.2s)
    setTimeout(() => {
      setIsKicking(false);
    }, 1200);
  }, [isKicking]);

  // Trigger automatically once when page is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerKick();
    }, 1800);
    return () => clearTimeout(timer);
  }, [triggerKick]);

  // Clean up particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <Page backgroundColor="#A01A1A">
      <AnimatedText text={text} className={styles.titleText} />

      <div className={styles.horseContainer} onClick={triggerKick}>
        <svg
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
          className={styles.horseSvg}
        >
          {/* Ground shadow */}
          <motion.ellipse
            cx="200"
            cy="345"
            rx="85"
            ry="10"
            fill="#5A0000"
            opacity="0.6"
            animate={
              isKicking ? { scaleX: [1, 0.85, 1], opacity: [0.6, 0.35, 0.6] } : {}
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Character Rig Root Wrapper */}
          <g transform="translate(160, 290)">
            {/* The entire horse body & parts that tilt together */}
            <motion.g
              className={styles.horseWhole}
              variants={horseBodyVariants}
              animate={isKicking ? "kick" : "idle"}
            >
              {/* BACK RIGHT LEG (Behind body) */}
              <g transform="translate(70, -50)">
                <motion.g
                  variants={backRightLegVariants}
                  animate={isKicking ? "kick" : "idle"}
                >
                  <path
                    d="M -5,-10 Q -10,40 -15,90 L 0,90 Q 5,40 10,-10 Z"
                    fill="#B81D24"
                  />
                  <path
                    d="M -15,80 L -15,90 L 0,90 L -2,80 Z"
                    fill="#FFD700"
                  />
                </motion.g>
              </g>

              {/* FRONT RIGHT LEG (Behind body) */}
              <g>
                <path
                  d="M 20,-50 Q 25,-10 30,40 L 45,40 Q 40,-10 35,-50 Z"
                  fill="#B81D24"
                />
                <path
                  d="M 30,30 L 30,40 L 45,40 L 43,30 Z"
                  fill="#FFD700"
                />
              </g>

              {/* TAIL */}
              <g transform="translate(85, -80)">
                <motion.g
                  variants={tailVariants}
                  animate={isKicking ? "kick" : "idle"}
                >
                  <path
                    d="M -5,-5 C 25,-15 60,5 65,35 C 68,55 50,75 35,65 C 25,55 10,25 -5,5 Z"
                    fill="#FF8C00"
                  />
                  <path
                    d="M -5,0 C 15,-5 35,10 40,30 C 40,40 30,50 25,45 C 18,40 8,20 -5,7 Z"
                    fill="#FFA500"
                  />
                </motion.g>
              </g>

              {/* BODY */}
              <path
                d="M -20,-75 C -30,-55 -20,-25 10,-20 C 50,-15 85,-30 95,-55 C 105,-80 90,-95 70,-95 C 40,-95 0,-95 -20,-75 Z"
                fill="#FF4D4D"
              />

              {/* NECK, HEAD & FACE */}
              <g transform="translate(-5, -90)">
                <motion.g
                  variants={headNeckVariants}
                  animate={isKicking ? "kick" : "idle"}
                >
                  {/* Mane behind neck */}
                  <path
                    d="M -15,-10 C -25,-30 -30,-60 -20,-85 C -10,-90 0,-70 0,-40 Z"
                    fill="#FF8C00"
                  />
                  <path d="M -20,-80 C -10,-105 10,-100 5,-70 Z" fill="#FFA500" />
                  {/* Neck with overlap flesh */}
                  <path
                    d="M -15,30 C -27,0 -25,-50 -10,-75 C 5,-70 15,-35 15,15 Z"
                    fill="#FF4D4D"
                  />
                  {/* Head */}
                  <path
                    d="M -10,-70 C -20,-90 -50,-100 -65,-85 C -80,-70 -75,-45 -50,-40 C -30,-35 -15,-45 -10,-70 Z"
                    fill="#FF4D4D"
                  />
                  {/* Snout overlay */}
                  <path
                    d="M -60,-80 C -70,-75 -73,-55 -63,-48 C -53,-45 -45,-55 -45,-65 Z"
                    fill="#FFA0A0"
                    opacity="0.4"
                  />

                  {/* Eye with blink (Local coordinates centered at 0,0) */}
                  <g transform="translate(-40, -75)">
                    <motion.g variants={eyeVariants} animate="blink">
                      <circle cx="0" cy="0" r="9" fill="white" />
                      <circle cx="-2" cy="0" r="5" fill="black" />
                      <circle cx="-4" cy="-2" r="2.2" fill="white" />
                      <circle cx="0" cy="2" r="1" fill="white" />
                    </motion.g>
                  </g>

                  {/* Smile */}
                  <path
                    d="M -63,-58 Q -57,-51 -51,-59"
                    stroke="#500000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Nostril */}
                  <circle cx="-66" cy="-66" r="1.5" fill="#500000" />

                  {/* Ears */}
                  <g transform="translate(-15, -80)">
                    <motion.g
                      variants={earVariants}
                      animate={isKicking ? "kick" : "idle"}
                    >
                      {/* Back Ear */}
                      <path d="M -5,5 C -8,-15 2,-20 2,0 Z" fill="#B81D24" />
                      {/* Front Ear */}
                      <path d="M 0,3 C -2,-22 10,-27 8,-2 Z" fill="#FF4D4D" />
                      <path
                        d="M 2,-2 C 0,-17 7,-20 6,-5 Z"
                        fill="#FFA0A0"
                      />
                    </motion.g>
                  </g>
                </motion.g>
              </g>

              {/* FRONT LEFT LEG (In front of body) */}
              <g>
                <path
                  d="M -5,-40 Q -10,0 -15,40 L 0,40 Q 5,0 10,-40 Z"
                  fill="#FF4D4D"
                />
                <path
                  d="M -15,30 L -15,40 L 0,40 L -2,30 Z"
                  fill="#FFD700"
                />
              </g>

              {/* BACK LEFT LEG (In front of body) */}
              <g transform="translate(82, -45)">
                <motion.g
                  variants={backLeftLegVariants}
                  animate={isKicking ? "kick" : "idle"}
                >
                  <path
                    d="M -7,-10 Q -2,35 3,85 L 18,85 Q 13,35 8,-10 Z"
                    fill="#FF4D4D"
                  />
                  <path
                    d="M 3,75 L 3,85 L 18,85 L 16,75 Z"
                    fill="#FFD700"
                  />
                </motion.g>
              </g>
            </motion.g>
          </g>
        </svg>

        {/* Dynamic Particle Container centered at the heels peak of the kick */}
        <div className={styles.particleContainer}>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className={styles.particle}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
              animate={{
                x: p.targetX,
                y: p.targetY,
                opacity: 0,
                scale: [0.5, 1.3, 0],
                rotate: p.rotation + 360,
              }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              style={{ position: "absolute" }}
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
              ) : p.type === "cloud" ? (
                <svg
                  viewBox="0 0 24 24"
                  width={p.size}
                  height={p.size}
                  fill={p.color}
                >
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
              ) : (
                <div
                  style={{
                    width: p.size / 1.5,
                    height: p.size / 1.5,
                    borderRadius: "50%",
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Page>
  );
}
