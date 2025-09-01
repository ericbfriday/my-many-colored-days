import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./PinkDay.module.css";

const text =
  "But when my days are happy pink, it's great to jump and just not think!";

export default function PinkDay() {
  const shapes = Array.from({ length: 10 });
  return (
    <Page backgroundColor="#FFC0CB">
      <AnimatedText text={text} style={{ color: "#D40078" }} />
      {shapes.map((_, i) => (
        <div
          key={i}
          className={`${styles.shape} ${styles[`shape${i + 1}`]}`}
        ></div>
      ))}
    </Page>
  );
}
