import React from "react";
import styles from "./Page.module.css";

export default function Page({ children, backgroundColor }) {
  const pageStyle = {
    background: backgroundColor || "transparent",
  };

  return (
    <div className={styles.page} style={pageStyle}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
