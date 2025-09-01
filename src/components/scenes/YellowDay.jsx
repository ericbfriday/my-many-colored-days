import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./YellowDay.module.css";

const text = "Then comes a yellow day and, wee! I am a busy, buzzy bee.";

export default function YellowDay() {
  return (
    <Page backgroundColor="#FFDD00">
      <AnimatedText text={text} style={{ color: "#333" }} />
      <div className={styles.bee}>
        <div className={styles.beeBody}></div>
        <div className={styles.beeWing1}></div>
        <div className={styles.beeWing2}></div>
      </div>
    </Page>
  );
}
