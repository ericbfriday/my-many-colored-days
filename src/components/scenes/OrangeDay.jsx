import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./OrangeDay.module.css";

const text =
  "Then all of a sudden I'm a circus seal! On my orange days that's how I feel.";

export default function OrangeDay() {
  return (
    <Page backgroundColor="#FF7F00">
      <AnimatedText text={text} className={styles.titleText} />
      <div className={styles.circusSeal}>
        <div className={styles.ball}></div>
      </div>
    </Page>
  );
}
