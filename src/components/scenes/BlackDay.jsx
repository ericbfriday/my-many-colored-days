import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./BlackDay.module.css";

const text =
  "Then come my black days, MAD and LOUD. I howl, I growl at every cloud.";

export default function BlackDay() {
  return (
    <Page backgroundColor="#000000">
      <div className={styles.scene}>
        <AnimatedText text={text} className={styles.titleText} />
        <div className={`${styles.lightning} ${styles.bolt1}`}></div>
        <div className={`${styles.lightning} ${styles.bolt2}`}></div>
      </div>
    </Page>
  );
}
