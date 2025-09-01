import React from "react";
import { usePageStore } from "../store/usePageStore";
import styles from "./Navigation.module.css"; // Import the CSS module

export default function Navigation() {
  const { nextPage, previousPage } = usePageStore();

  return (
    // Use className instead of inline styles
    <div className={styles.navContainer}>
      <button className={styles.navButton} onClick={previousPage}>
        Previous
      </button>
      <button className={styles.navButton} onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
