import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./BlueDay.module.css";

const text = "On bright blue days I flap my wings.";

export default function BlueDay() {
  return (
    <Page backgroundColor="#0077FF">
      <AnimatedText text={text} className={styles.titleText} />
      <div className={styles.wingContainer}>
        <div className={`${styles.wing} ${styles.leftWing}`}></div>
        <div className={`${styles.wing} ${styles.rightWing}`}></div>
      </div>
      <div className={`${styles.cloud} ${styles.cloud1}`}></div>
      <div className={`${styles.cloud} ${styles.cloud2}`}></div>
      <div className={`${styles.cloud} ${styles.cloud3}`}></div>
    </Page>
  );
}
