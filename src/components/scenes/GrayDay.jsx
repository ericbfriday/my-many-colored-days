import React, { useState } from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./GrayDay.module.css";

const text =
  "Gray day... everything is gray. I watch, but nothing moves today.";

export default function GrayDay() {
  const [isPressed, setIsPressed] = useState(false);

  const releasePulse = () => {
    setIsPressed(false);
  };

  return (
    <Page backgroundColor="#808080">
      <div className={styles.scene}>
        <div className={styles.focusArea}>
          <button
            type="button"
            className={`${styles.stillStone} ${isPressed ? styles.active : ""}`}
            onPointerDown={(event) => {
              if (event.button !== undefined && event.button !== 0) {
                return;
              }

              event.currentTarget.setPointerCapture?.(event.pointerId);
              setIsPressed(true);
            }}
            onPointerUp={(event) => {
              event.currentTarget.releasePointerCapture?.(event.pointerId);
              releasePulse();
            }}
            onPointerCancel={releasePulse}
            onLostPointerCapture={releasePulse}
            aria-label="Press and hold the gray pulse"
          >
            <span className={styles.stoneCore} />
            <span className={styles.ring} />
          </button>
        </div>
        <AnimatedText text={text} style={{ color: "#333" }} className={styles.titleText} />
      </div>
    </Page>
  );
}
