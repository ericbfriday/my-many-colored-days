import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./MixedUpDay.module.css";

const text =
  "Then comes a mixed-up day, and WHAM! I don't know who or what I am.";

export default function MixedUpDay() {
  const shapes = ["red", "blue", "green", "yellow", "purple", "orange"];
  return (
    <Page backgroundColor="#E0E0E0">
      <AnimatedText text={text} style={{ color: "#111" }} />
      {shapes.map((color) => (
        <div key={color} className={`${styles.shape} ${styles[color]}`}></div>
      ))}
    </Page>
  );
}
