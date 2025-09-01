import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./PurpleDay.module.css";

const text = "On purple days I'm sad. I groan. I drag my tail. I walk alone.";

export default function PurpleDay() {
  return (
    <Page backgroundColor="#4B0082">
      <AnimatedText text={text} className={styles.titleText} />
      <div className={styles.creature}>
        <div className={styles.tail}></div>
      </div>
    </Page>
  );
}
