import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./RedDay.module.css";

const text =
  "On bright red days how good it feels to be a horse and kick my heels!";

export default function RedDay() {
  // Create an array to easily render multiple particle elements
  const particles = Array.from({ length: 15 });

  return (
    <Page backgroundColor="#D92626">
      <AnimatedText text={text} className={styles.titleText} />

      <div className={styles.horseLeg}></div>

      <div className={styles.particleContainer}>
        {particles.map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>
    </Page>
  );
}
