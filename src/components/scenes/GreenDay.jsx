import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./GreenDay.module.css";

const text =
  "Green days. Deep, deep in the sea. Cool and quiet fish. That's me.";

export default function GreenDay() {
  return (
    <Page backgroundColor="#006A4E">
      <AnimatedText text={text} className={styles.titleText} />
      <div className={styles.fish}></div>
      <div className={`${styles.seaweed} ${styles.seaweed1}`}></div>
      <div className={`${styles.seaweed} ${styles.seaweed2}`}></div>
      <div className={`${styles.bubble} ${styles.bubble1}`}></div>
      <div className={`${styles.bubble} ${styles.bubble2}`}></div>
      <div className={`${styles.bubble} ${styles.bubble3}`}></div>
    </Page>
  );
}
