import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";
import styles from "./Finale.module.css";

const text =
  "But it all turns out all right, you see. And I go back to being me.";

export default function Finale() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
  return (
    <Page backgroundColor="#f0f0f0">
      <AnimatedText text={text} style={{ color: "#333", zIndex: 10 }} />
      <div className={styles.swirlContainer}>
        {colors.map((color, i) => (
          <div key={color} className={`${styles.swirl} ${styles[color]}`}></div>
        ))}
      </div>
    </Page>
  );
}
