import React from "react";
import { motion } from "framer-motion";

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function AnimatedText({ text, ...props }) {
  return (
    <motion.h1
      style={{ fontSize: "3rem", fontWeight: "bold" }}
      variants={sentence}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {text.split("").map((char, index) => (
        <motion.span key={char + "-" + index} variants={letter}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
