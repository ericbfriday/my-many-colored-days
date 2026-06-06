import React, { useEffect, useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./BlueDay.module.css";

const text = "On bright blue days I flap my wings.";

const GUST_SHAPES = [
  { dx: -34, dy: -20, rotation: -28, delay: "0s", kind: "line" },
  { dx: -10, dy: -36, rotation: -10, delay: "0.04s", kind: "line" },
  { dx: 22, dy: -18, rotation: 20, delay: "0.08s", kind: "line" },
  { dx: 36, dy: 4, rotation: 30, delay: "0.12s", kind: "line" },
  { dx: -18, dy: 18, rotation: -12, delay: "0.08s", kind: "swirl" },
  { dx: 16, dy: 22, rotation: 16, delay: "0.14s", kind: "swirl" },
];

const GUST_RESET_MS = 950;
const BIRD_REACT_MS = 720;

export default function BlueDay() {
  const [gusts, setGusts] = useState([]);
  const [birdLiftActive, setBirdLiftActive] = useState(false);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const handlePointerDown = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const gust = {
      id: Date.now() + Math.random(),
      xPercent: ((event.clientX - bounds.left) / bounds.width) * 100,
      yPercent: ((event.clientY - bounds.top) / bounds.height) * 100,
    };

    setGusts((currentGusts) => [...currentGusts, gust]);
    setBirdLiftActive(true);

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setGusts((currentGusts) =>
          currentGusts.filter((currentGust) => currentGust.id !== gust.id)
        );
      }, GUST_RESET_MS)
    );

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setBirdLiftActive(false);
      }, BIRD_REACT_MS)
    );
  };

  return (
    <Page backgroundColor="#0077FF">
      <div className={styles.scene} onPointerDown={handlePointerDown}>
        <AnimatedText text={text} className={styles.titleText} />

        <div
          className={`${styles.birdContainer} ${
            birdLiftActive ? styles.birdContainerLift : ""
          }`}
        >
          <svg viewBox="0 0 300 200" className={styles.birdSvg}>
            <g
              className={`${styles.birdWing} ${styles.birdLeftWing} ${
                birdLiftActive ? styles.birdLeftWingLift : ""
              }`}
            >
              <path
                d="M 138,95 C 100,80 60,65 20,75 C 10,78 5,85 10,92 C 25,110 50,118 75,108 C 88,118 108,122 122,110 C 130,115 136,110 138,102 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            </g>

            <g
              className={`${styles.birdWing} ${styles.birdRightWing} ${
                birdLiftActive ? styles.birdRightWingLift : ""
              }`}
            >
              <path
                d="M 162,95 C 200,80 240,65 280,75 C 290,78 295,85 290,92 C 275,110 250,118 225,108 C 212,118 192,122 178,110 C 170,115 164,110 162,102 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            </g>

            <g className={`${styles.birdBody} ${birdLiftActive ? styles.birdBodyLift : ""}`}>
              <path
                d="M 150,55 C 158,55 162,65 162,85 C 162,115 165,135 170,155 L 158,150 L 150,160 L 142,150 L 130,155 C 135,135 138,115 138,85 C 138,65 142,55 150,55 Z"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="1.2"
              />
              <circle cx="146" cy="68" r="1.5" fill="#334155" />
              <circle cx="154" cy="68" r="1.5" fill="#334155" />
              <polygon points="148,60 152,60 150,52" fill="#f59e0b" />
            </g>
          </svg>
        </div>

        {gusts.map((gust) => (
          <div
            key={gust.id}
            className={styles.gust}
            style={{
              "--gust-x": `${gust.xPercent}%`,
              "--gust-y": `${gust.yPercent}%`,
            }}
          >
            <span className={styles.gustMarker} />
            {GUST_SHAPES.map((shape, index) => (
              <span
                key={`${gust.id}-${index}`}
                className={`${styles.gustShape} ${
                  shape.kind === "swirl" ? styles.gustSwirl : styles.gustLine
                }`}
                style={{
                  "--gust-dx": `${shape.dx}px`,
                  "--gust-dy": `${shape.dy}px`,
                  "--gust-rotation": `${shape.rotation}deg`,
                  "--gust-delay": shape.delay,
                }}
              />
            ))}
          </div>
        ))}

        <svg className={`${styles.cloud} ${styles.cloud1}`} viewBox="0 0 200 120">
          <defs>
            <linearGradient id="cloudGrad1" x1="10%" y1="10%" x2="40%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
          </defs>
          <path d="M 40,90 A 25,25 0 0,1 60,50 A 35,35 0 0,1 120,40 A 30,30 0 0,1 165,65 A 25,25 0 0,1 160,95 H 40 A 20,20 0 0,1 40,90 Z" fill="url(#cloudGrad1)" />
        </svg>

        <svg className={`${styles.cloud} ${styles.cloud2}`} viewBox="0 0 280 130">
          <defs>
            <linearGradient id="cloudGrad2" x1="10%" y1="10%" x2="30%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path d="M 35,95 A 25,25 0 0,1 60,60 A 35,35 0 0,1 115,50 A 40,40 0 0,1 190,55 A 30,30 0 0,1 245,75 A 25,25 0 0,1 240,105 H 35 A 25,25 0 0,1 35,95 Z" fill="url(#cloudGrad2)" />
        </svg>

        <svg className={`${styles.cloud} ${styles.cloud3}`} viewBox="0 0 160 100">
          <defs>
            <linearGradient id="cloudGrad3" x1="10%" y1="10%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f9fafb" />
            </linearGradient>
          </defs>
          <path d="M 30,80 A 20,20 0 0,1 50,50 A 25,25 0 0,1 95,45 A 20,20 0 0,1 130,65 A 15,15 0 0,1 125,85 H 30 A 15,15 0 0,1 30,80 Z" fill="url(#cloudGrad3)" />
        </svg>

        <svg className={`${styles.cloud} ${styles.cloud4}`} viewBox="0 0 200 120">
          <path d="M 40,90 A 25,25 0 0,1 60,50 A 35,35 0 0,1 120,40 A 30,30 0 0,1 165,65 A 25,25 0 0,1 160,95 H 40 A 20,20 0 0,1 40,90 Z" fill="url(#cloudGrad1)" />
        </svg>

        <svg className={`${styles.cloud} ${styles.cloud5}`} viewBox="0 0 280 130">
          <path d="M 35,95 A 25,25 0 0,1 60,60 A 35,35 0 0,1 115,50 A 40,40 0 0,1 190,55 A 30,30 0 0,1 245,75 A 25,25 0 0,1 240,105 H 35 A 25,25 0 0,1 35,95 Z" fill="url(#cloudGrad2)" />
        </svg>

        <svg className={`${styles.cloud} ${styles.cloud6}`} viewBox="0 0 160 100">
          <path d="M 30,80 A 20,20 0 0,1 50,50 A 25,25 0 0,1 95,45 A 20,20 0 0,1 130,65 A 15,15 0 0,1 125,85 H 30 A 15,15 0 0,1 30,80 Z" fill="url(#cloudGrad3)" />
        </svg>

        <svg className={`${styles.cloud} ${styles.cloud7}`} viewBox="0 0 200 120">
          <path d="M 40,90 A 25,25 0 0,1 60,50 A 35,35 0 0,1 120,40 A 30,30 0 0,1 165,65 A 25,25 0 0,1 160,95 H 40 A 20,20 0 0,1 40,90 Z" fill="url(#cloudGrad1)" />
        </svg>
      </div>
    </Page>
  );
}
