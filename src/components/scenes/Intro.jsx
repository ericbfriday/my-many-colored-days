import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./Intro.module.css";

const text =
  "Some days are yellow, some are blue. On different days, I'm different too.";

export default function Intro() {
  return (
    <Page backgroundColor="#f0f0f0">
      {/* These divs create the animated background splotches */}
      <div className={`${styles.splotch} ${styles.yellow}`}></div>
      <div className={`${styles.splotch} ${styles.blue}`}></div>
      <div className={`${styles.splotch} ${styles.red}`}></div>
      <div className={`${styles.splotch} ${styles.green}`}></div>

      <AnimatedText text={text} className={styles.titleText} />
    </Page>
  );
}
