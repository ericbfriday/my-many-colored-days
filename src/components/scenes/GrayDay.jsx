import React from "react";
import Page from "../Page";
import AnimatedText from "../AnimatedText";

const text =
  "Gray day... everything is gray. I watch, but nothing moves today.";

export default function GrayDay() {
  // Intentionally static
  return (
    <Page backgroundColor="#808080">
      <AnimatedText text={text} style={{ color: "#333" }} />
    </Page>
  );
}
