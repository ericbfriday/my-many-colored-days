import React from "react";
import { usePageStore } from "../store/usePageStore";

// Basic styling for the navigation buttons
const navStyles = {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 100,
  display: "flex",
  gap: "1rem",
};

const buttonStyles = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default function Navigation() {
  // Use the actions from our Zustand store
  const { nextPage, previousPage } = usePageStore();

  return (
    <div style={navStyles}>
      <button style={buttonStyles} onClick={previousPage}>
        Previous
      </button>
      <button style={buttonStyles} onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
