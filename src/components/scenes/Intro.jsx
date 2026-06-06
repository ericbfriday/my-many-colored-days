import React, { useEffect, useMemo, useRef, useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./Intro.module.css";

const text =
  "Some days are yellow, some are blue. On different days, I'm different too.";

const SPLOTCHES = [
  { id: "yellow", x: 0.18, y: 0.68, size: 220, mobileSize: 160 },
  { id: "blue", x: 0.82, y: 0.74, size: 210, mobileSize: 155 },
  { id: "red", x: 0.12, y: 0.22, size: 195, mobileSize: 145 },
  { id: "green", x: 0.8, y: 0.16, size: 205, mobileSize: 150 },
];

const DRAG_RESPONSE = {
  maxStretch: 0.42,
  rotationFactor: 0.16,
  blurBoost: 18,
  releaseDecayMs: 220,
};

function getViewport() {
  if (typeof window === "undefined") {
    return { width: 1280, height: 720 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function buildInitialSplotches() {
  return SPLOTCHES.map((splotch, index) => ({
    ...splotch,
    x: splotch.x,
    y: splotch.y,
    stretchX: 0,
    stretchY: 0,
    rotation: 0,
    dragBlur: 0,
    overlap: 0,
    dragging: false,
    zIndex: index + 1,
  }));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function Intro() {
  const [splotches, setSplotches] = useState(() => buildInitialSplotches());
  const draggingRef = useRef(null);
  const releaseTimerRef = useRef(null);
  const zIndexRef = useRef(SPLOTCHES.length + 1);

  const sizeMap = useMemo(
    () =>
      Object.fromEntries(
        SPLOTCHES.map((splotch) => [
          splotch.id,
          { desktop: splotch.size, mobile: splotch.mobileSize },
        ]),
      ),
    [],
  );

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateOverlap = (items) => {
      const viewport = getViewport();

      return items.map((current) => {
        const size = viewport.width <= 768
          ? sizeMap[current.id].mobile
          : sizeMap[current.id].desktop;
        const currentX = current.x * viewport.width;
        const currentY = current.y * viewport.height;
        let overlap = 0;

        items.forEach((other) => {
          if (other.id === current.id) {
            return;
          }

          const otherSize = viewport.width <= 768
            ? sizeMap[other.id].mobile
            : sizeMap[other.id].desktop;
          const otherX = other.x * viewport.width;
          const otherY = other.y * viewport.height;
          const distance = Math.hypot(otherX - currentX, otherY - currentY);
          const threshold = (size + otherSize) * 0.58;
          const blend = clamp(1 - distance / threshold, 0, 1);

          overlap = Math.max(overlap, blend);
        });

        return { ...current, overlap };
      });
    };

    setSplotches((current) => updateOverlap(current));
  }, [sizeMap]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const drag = draggingRef.current;

      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }

      const viewport = getViewport();
      const size = viewport.width <= 768
        ? sizeMap[drag.id].mobile
        : sizeMap[drag.id].desktop;
      const halfSize = size / 2;
      const nextX = clamp(
        (event.clientX - drag.offsetX) / viewport.width,
        halfSize / viewport.width,
        1 - halfSize / viewport.width,
      );
      const nextY = clamp(
        (event.clientY - drag.offsetY) / viewport.height,
        halfSize / viewport.height,
        1 - halfSize / viewport.height,
      );
      const dx = event.clientX - drag.lastClientX;
      const dy = event.clientY - drag.lastClientY;
      const magnitude = Math.min(Math.hypot(dx, dy) / 28, 1);
      const stretchX = clamp(Math.abs(dx) / 28, 0, DRAG_RESPONSE.maxStretch);
      const stretchY = clamp(Math.abs(dy) / 28, 0, DRAG_RESPONSE.maxStretch);

      drag.lastClientX = event.clientX;
      drag.lastClientY = event.clientY;

      setSplotches((current) => {
        const updated = current.map((splotch) =>
          splotch.id === drag.id
            ? {
                ...splotch,
                x: nextX,
                y: nextY,
                stretchX,
                stretchY,
                rotation: clamp(
                  (dx - dy) * DRAG_RESPONSE.rotationFactor,
                  -16,
                  16,
                ),
                dragBlur: magnitude * DRAG_RESPONSE.blurBoost,
              }
            : splotch,
        );

        return applyOverlap(updated, viewport, sizeMap);
      });
    };

    const finishDrag = (event) => {
      const drag = draggingRef.current;

      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }

      draggingRef.current = null;

      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }

      setSplotches((current) =>
        current.map((splotch) =>
          splotch.id === drag.id
            ? { ...splotch, dragging: false }
            : splotch,
        ),
      );

      releaseTimerRef.current = window.setTimeout(() => {
        setSplotches((current) =>
          current.map((splotch) =>
            splotch.id === drag.id
              ? {
                  ...splotch,
                  stretchX: 0,
                  stretchY: 0,
                  rotation: 0,
                  dragBlur: 0,
                }
              : splotch,
          ),
        );
      }, DRAG_RESPONSE.releaseDecayMs);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
    };
  }, [sizeMap]);

  const handlePointerDown = (id) => (event) => {
    event.preventDefault();

    const viewport = getViewport();
    const active = splotches.find((splotch) => splotch.id === id);

    if (!active) {
      return;
    }

    const centerX = active.x * viewport.width;
    const centerY = active.y * viewport.height;

    draggingRef.current = {
      id,
      pointerId: event.pointerId,
      offsetX: event.clientX - centerX,
      offsetY: event.clientY - centerY,
      lastClientX: event.clientX,
      lastClientY: event.clientY,
    };

    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
    }

    zIndexRef.current += 1;

    setSplotches((current) =>
      current.map((splotch) =>
        splotch.id === id
          ? {
              ...splotch,
              dragging: true,
              zIndex: zIndexRef.current,
            }
          : splotch,
      ),
    );
  };

  return (
    <Page backgroundColor="#f0f0f0">
      <div className={styles.sceneRoot}>
        <div className={styles.splotchLayer} aria-hidden="true">
          {splotches.map((splotch) => (
            <button
              key={splotch.id}
              type="button"
              className={`${styles.splotch} ${styles[splotch.id]}`}
              data-dragging={splotch.dragging}
              onPointerDown={handlePointerDown(splotch.id)}
              style={{
                left: `${splotch.x * 100}%`,
                top: `${splotch.y * 100}%`,
                "--stretch-x": (1 + splotch.stretchX).toFixed(3),
                "--stretch-y": (1 + splotch.stretchY).toFixed(3),
                "--rotation": `${splotch.rotation.toFixed(2)}deg`,
                "--drag-blur": `${splotch.dragBlur.toFixed(2)}px`,
                "--overlap": splotch.overlap.toFixed(3),
                zIndex: splotch.zIndex,
              }}
            />
          ))}
        </div>

        <div className={styles.titleWrap}>
          <AnimatedText text={text} className={styles.titleText} />
        </div>
      </div>
    </Page>
  );
}

function applyOverlap(items, viewport, sizeMap) {
  return items.map((current) => {
    const size = viewport.width <= 768
      ? sizeMap[current.id].mobile
      : sizeMap[current.id].desktop;
    const currentX = current.x * viewport.width;
    const currentY = current.y * viewport.height;
    let overlap = 0;

    items.forEach((other) => {
      if (other.id === current.id) {
        return;
      }

      const otherSize = viewport.width <= 768
        ? sizeMap[other.id].mobile
        : sizeMap[other.id].desktop;
      const otherX = other.x * viewport.width;
      const otherY = other.y * viewport.height;
      const distance = Math.hypot(otherX - currentX, otherY - currentY);
      const threshold = (size + otherSize) * 0.58;
      const blend = clamp(1 - distance / threshold, 0, 1);

      overlap = Math.max(overlap, blend);
    });

    return { ...current, overlap };
  });
}
