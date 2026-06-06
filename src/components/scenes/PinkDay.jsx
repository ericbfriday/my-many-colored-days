import React, { useEffect, useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./PinkDay.module.css";

const text =
  "But when my days are happy pink, it's great to jump and just not think!";

const SHAPES = [
  { left: 10, size: 50, color: "#ff69b4", delay: 0 },
  { left: 20, size: 30, color: "#ff1493", delay: 0.2 },
  { left: 35, size: 60, color: "#db7093", delay: 0.4 },
  { left: 50, size: 40, color: "#c71585", delay: 0.6 },
  { left: 65, size: 55, color: "#ff69b4", delay: 0.8 },
  { left: 80, size: 45, color: "#ff1493", delay: 1 },
  { left: 90, size: 35, color: "#db7093", delay: 1.2 },
  { left: 15, size: 50, color: "#c71585", delay: 1.4 },
  { left: 45, size: 40, color: "#ff69b4", delay: 1.6 },
  { left: 75, size: 60, color: "#ff1493", delay: 1.8 },
];

const PARTICLE_VECTORS = [
  { dx: -42, dy: -88, rotation: -22, kind: "heart" },
  { dx: -18, dy: -110, rotation: 12, kind: "dot" },
  { dx: 12, dy: -96, rotation: -8, kind: "heart" },
  { dx: 38, dy: -84, rotation: 18, kind: "dot" },
  { dx: -54, dy: -52, rotation: -34, kind: "dot" },
  { dx: 54, dy: -56, rotation: 28, kind: "heart" },
  { dx: -8, dy: -60, rotation: 6, kind: "dot" },
  { dx: 24, dy: -42, rotation: -18, kind: "dot" },
];

const TAP_COOLDOWN_MS = 450;
const BOOST_RESET_MS = 540;
const BURST_RESET_MS = 950;

export default function PinkDay() {
  const [boostedShapes, setBoostedShapes] = useState([]);
  const [bursts, setBursts] = useState([]);
  const timeoutRefs = useRef([]);
  const lastTapRef = useRef(0);

  useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const handlePointerDown = (event) => {
    const now = Date.now();
    if (now - lastTapRef.current < TAP_COOLDOWN_MS) {
      return;
    }
    lastTapRef.current = now;

    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;

    const nearbyShapeIds = SHAPES.map((shape, index) => ({
      index,
      distance: Math.abs(shape.left - xPercent),
    }))
      .sort((a, b) => a.distance - b.distance)
      .filter((shape, index) => shape.distance <= 20 || index < 3)
      .map((shape) => shape.index);

    const burstId = now;
    setBoostedShapes(nearbyShapeIds);
    setBursts((currentBursts) => [...currentBursts, { id: burstId, xPercent, yPercent }]);

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setBoostedShapes([]);
      }, BOOST_RESET_MS)
    );

    timeoutRefs.current.push(
      window.setTimeout(() => {
        setBursts((currentBursts) =>
          currentBursts.filter((burst) => burst.id !== burstId)
        );
      }, BURST_RESET_MS)
    );
  };

  return (
    <Page backgroundColor="#FFC0CB">
      <div className={styles.scene} onPointerDown={handlePointerDown}>
        <AnimatedText text={text} style={{ color: "#D40078" }} />
        {SHAPES.map((shape, index) => (
          <div
            key={shape.left}
            className={`${styles.shape} ${
              boostedShapes.includes(index) ? styles.shapeBoosted : ""
            }`}
            style={{
              "--shape-left": `${shape.left}%`,
              "--shape-size": `${shape.size}px`,
              "--shape-color": shape.color,
              "--shape-delay": `${shape.delay}s`,
            }}
          />
        ))}

        {bursts.map((burst) => (
          <div
            key={burst.id}
            className={styles.burst}
            style={{
              "--burst-x": `${burst.xPercent}%`,
              "--burst-y": `${burst.yPercent}%`,
            }}
          >
            {PARTICLE_VECTORS.map((particle, index) => (
              <span
                key={`${burst.id}-${index}`}
                className={`${styles.particle} ${
                  particle.kind === "heart" ? styles.particleHeart : styles.particleDot
                }`}
                style={{
                  "--particle-dx": `${particle.dx}px`,
                  "--particle-dy": `${particle.dy}px`,
                  "--particle-rotation": `${particle.rotation}deg`,
                }}
              >
                {particle.kind === "heart" ? "♥" : ""}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Page>
  );
}
