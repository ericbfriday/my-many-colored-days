import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./BrownDay.module.css";

const text =
  "Some days of course feel sort of brown. Then I feel slow and low, low down.";

export default function BrownDay() {
  return (
    <Page backgroundColor="#8B4513">
      <AnimatedText text={text} style={{ animationDelay: "1s" }} />
      <div className={styles.blob}></div>
    </Page>
  );
}
