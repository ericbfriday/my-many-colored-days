import React, { useEffect, useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./Finale.module.css";

const text =
  "But it all turns out all right, you see. And I go back to being me.";

const swirls = [
  { color: "red", delay: "0s", duration: "5.8s", weight: 0.2, size: 170 },
  { color: "blue", delay: "-0.8s", duration: "6.3s", weight: 0.24, size: 184 },
  { color: "green", delay: "-1.6s", duration: "5.5s", weight: 0.18, size: 176 },
  { color: "yellow", delay: "-2.2s", duration: "6.8s", weight: 0.28, size: 164 },
  { color: "purple", delay: "-3s", duration: "5.9s", weight: 0.22, size: 180 },
  { color: "orange", delay: "-3.7s", duration: "6.5s", weight: 0.26, size: 172 },
  { color: "pink", delay: "-4.4s", duration: "6.1s", weight: 0.16, size: 188 },
];

const defaultTarget = { x: 0, y: 0 };

export default function Finale() {
  const sceneRef = useRef(null);
  const resetTimerRef = useRef(null);
  const clearTimerRef = useRef(null);
  const [pointerTarget, setPointerTarget] = useState(defaultTarget);
  const [pullStrength, setPullStrength] = useState(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(resetTimerRef.current);
      window.clearTimeout(clearTimerRef.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    const scene = sceneRef.current;
    if (!scene) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    setPointerTarget({ x, y });
    setPullStrength(1);

    window.clearTimeout(resetTimerRef.current);
    window.clearTimeout(clearTimerRef.current);

    resetTimerRef.current = window.setTimeout(() => {
      setPullStrength(0);
    }, 260);

    clearTimerRef.current = window.setTimeout(() => {
      setPointerTarget(defaultTarget);
    }, 1200);
  };

  return (
    <Page backgroundColor="#f0f0f0">
      <div
        ref={sceneRef}
        className={styles.scene}
        onPointerDown={handlePointerDown}
      >
        <AnimatedText text={text} style={{ color: "#333", zIndex: 10 }} />
        <div className={styles.swirlField} aria-hidden="true">
          {swirls.map((swirl) => (
            <div
              key={swirl.color}
              className={styles.swirlOrbit}
              style={{
                "--orbit-delay": swirl.delay,
                "--orbit-duration": swirl.duration,
                "--swirl-size": `${swirl.size}px`,
              }}
            >
              <div
                className={styles.swirlPull}
                style={{
                  "--pull-x": `${pointerTarget.x}px`,
                  "--pull-y": `${pointerTarget.y}px`,
                  "--pull-strength": pullStrength,
                  "--pull-weight": swirl.weight,
                }}
              >
                <div className={`${styles.swirl} ${styles[swirl.color]}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
