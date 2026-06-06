import React, { useEffect, useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./YellowDay.module.css";

const text = "Then comes a yellow day and, wee! I am a busy, buzzy bee.";

export default function YellowDay() {
  const [beeTarget, setBeeTarget] = useState(null);
  const [effects, setEffects] = useState([]);
  const sceneRef = useRef(null);
  const targetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (targetTimeoutRef.current) {
        window.clearTimeout(targetTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event) => {
    if (!sceneRef.current) {
      return;
    }

    const rect = sceneRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = Math.max(8, Math.min(88, (x / rect.width) * 100));
    const yPercent = Math.max(22, Math.min(82, (y / rect.height) * 100));
    const id = `yellow-effect-${Date.now()}-${Math.random()}`;
    const variant = Math.random() > 0.5 ? "flower" : "pollen";

    setEffects((prev) => [...prev, { id, x, y, variant }]);
    window.setTimeout(() => {
      setEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1600);

    setBeeTarget({ xPercent, yPercent });
    if (targetTimeoutRef.current) {
      window.clearTimeout(targetTimeoutRef.current);
    }
    targetTimeoutRef.current = window.setTimeout(() => {
      setBeeTarget(null);
      targetTimeoutRef.current = null;
    }, 1800);
  };

  return (
    <Page backgroundColor="#FFDD00">
      <div
        ref={sceneRef}
        className={styles.scene}
        onPointerDown={handlePointerDown}
      >
        <AnimatedText
          text={text}
          className={styles.titleText}
          style={{ color: "#333" }}
        />
        <div className={styles.effectLayer} aria-hidden="true">
          {effects.map((effect) => (
            <div
              key={effect.id}
              className={`${styles.effect} ${styles[effect.variant]}`}
              style={{
                left: effect.x,
                top: effect.y,
              }}
            >
              <div className={styles.effectCore}></div>
              <div className={styles.effectPetalA}></div>
              <div className={styles.effectPetalB}></div>
              <div className={styles.effectPetalC}></div>
              <div className={styles.effectPetalD}></div>
            </div>
          ))}
        </div>
        <div
          className={`${styles.bee} ${beeTarget ? styles.beeTargeting : ""}`}
          style={
            beeTarget
              ? {
                  left: `${beeTarget.xPercent}%`,
                  top: `${beeTarget.yPercent}%`,
                }
              : undefined
          }
        >
          <div className={styles.beeTrail}></div>
          <div className={styles.beeBody}></div>
          <div className={styles.beeWing1}></div>
          <div className={styles.beeWing2}></div>
        </div>
      </div>
    </Page>
  );
}
