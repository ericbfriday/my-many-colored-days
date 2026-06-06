import React, { useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./BrownDay.module.css";

const text =
  "Some days of course feel sort of brown. Then I feel slow and low, low down.";

const MAX_STAMPS = 18;
const DRAG_DISTANCE = 34;
const DRAG_INTERVAL_MS = 120;

function createStamp(x, y, index) {
  return {
    id: `stamp-${Date.now()}-${index}-${Math.round(Math.random() * 1000)}`,
    x,
    y,
    type: index % 3 === 2 ? "ripple" : "footprint",
    rotation: Math.random() * 18 - 9,
    scale: 0.9 + Math.random() * 0.3,
    tone: Math.random() > 0.55 ? "deep" : "soft",
    side: index % 2 === 0 ? "left" : "right",
  };
}

export default function BrownDay() {
  const [stamps, setStamps] = useState([]);
  const pointerStateRef = useRef({
    isDown: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    lastStampAt: 0,
    count: 0,
  });

  const addStamp = (event, force = false) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const thresholdY = rect.height * 0.62;

    if (y < thresholdY) {
      return false;
    }

    const state = pointerStateRef.current;
    const now = Date.now();
    const distance = Math.hypot(x - state.lastX, y - state.lastY);

    if (!force && (distance < DRAG_DISTANCE || now - state.lastStampAt < DRAG_INTERVAL_MS)) {
      return false;
    }

    state.lastX = x;
    state.lastY = y;
    state.lastStampAt = now;
    state.count += 1;

    const clampedY = Math.min(y, rect.height - 18);
    const stamp = createStamp(x, clampedY, state.count);

    setStamps((prev) => [...prev.slice(-(MAX_STAMPS - 1)), stamp]);
    return true;
  };

  const handlePointerDown = (event) => {
    pointerStateRef.current.isDown = true;
    pointerStateRef.current.pointerId = event.pointerId;
    pointerStateRef.current.lastX = event.clientX;
    pointerStateRef.current.lastY = event.clientY;
    pointerStateRef.current.lastStampAt = 0;

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    addStamp(event, true);
  };

  const handlePointerMove = (event) => {
    const state = pointerStateRef.current;
    if (!state.isDown || state.pointerId !== event.pointerId) {
      return;
    }

    addStamp(event);
  };

  const handlePointerEnd = (event) => {
    const state = pointerStateRef.current;
    if (state.pointerId === event.pointerId) {
      state.isDown = false;
      state.pointerId = null;
    }

    if (
      event.currentTarget.hasPointerCapture &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <Page backgroundColor="#8B4513">
      <div
        className={styles.scene}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        <AnimatedText text={text} style={{ animationDelay: "1s", zIndex: 2 }} />
        <div className={styles.stampLayer} aria-hidden="true">
          {stamps.map((stamp) => (
            <div
              key={stamp.id}
              className={`${styles.stamp} ${
                stamp.type === "ripple" ? styles.rippleStamp : styles.footprintStamp
              } ${stamp.tone === "deep" ? styles.deepTone : styles.softTone}`}
              style={{
                left: `${stamp.x}px`,
                top: `${stamp.y}px`,
              }}
            >
              <div
                className={styles.stampInner}
                style={{
                  "--stamp-rotation": `${stamp.rotation}deg`,
                  "--stamp-scale": stamp.scale,
                }}
              >
                {stamp.type === "ripple" ? (
                  <>
                    <span className={styles.rippleRing}></span>
                    <span className={`${styles.rippleRing} ${styles.rippleRingInner}`}></span>
                  </>
                ) : (
                  <div
                    className={`${styles.footprint} ${
                      stamp.side === "left" ? styles.leftPrint : styles.rightPrint
                    }`}
                  >
                    <span className={styles.heel}></span>
                    <span className={`${styles.toe} ${styles.toeOne}`}></span>
                    <span className={`${styles.toe} ${styles.toeTwo}`}></span>
                    <span className={`${styles.toe} ${styles.toeThree}`}></span>
                    <span className={`${styles.toe} ${styles.toeFour}`}></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.blob}></div>
      </div>
    </Page>
  );
}
