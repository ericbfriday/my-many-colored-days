import React from "react";
import { usePageStore } from "./store/usePageStore";
import Navigation from "./components/Navigation";
import { AnimatePresence, motion } from "framer-motion";

// --- Import ALL scene components ---
import Intro from "./components/scenes/Intro";
import RedDay from "./components/scenes/RedDay";
import BlueDay from "./components/scenes/BlueDay";
import BrownDay from "./components/scenes/BrownDay";
import YellowDay from "./components/scenes/YellowDay";
import GrayDay from "./components/scenes/GrayDay";
import OrangeDay from "./components/scenes/OrangeDay";
import GreenDay from "./components/scenes/GreenDay";
import PurpleDay from "./components/scenes/PurpleDay";
import PinkDay from "./components/scenes/PinkDay";
import BlackDay from "./components/scenes/BlackDay";
import MixedUpDay from "./components/scenes/MixedUpDay";
import Finale from "./components/scenes/Finale";

// --- Create the array that maps page index to the component ---
const pages = [
  <Intro />,
  <RedDay />,
  <BlueDay />,
  <BrownDay />,
  <YellowDay />,
  <GrayDay />,
  <OrangeDay />,
  <GreenDay />,
  <PurpleDay />,
  <PinkDay />,
  <BlackDay />,
  <MixedUpDay />,
  <Finale />,
];

// --- Define our page transition animation ---
const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw", // Uncomment for a slide-in effect
  },
  in: {
    opacity: 1,
    // x: 0,
  },
  out: {
    opacity: 0,
    // x: "100vw", // Uncomment for a slide-out effect
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

function App() {
  const currentPage = usePageStore((state) => state.currentPage);

  return (
    <>
      <AnimatePresence mode="wait">
        {/* We add a 'key' to our motion.div. This is crucial! */}
        {/* AnimatePresence uses this key to track which component is on screen. */}
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      <Navigation />
    </>
  );
}

export default App;
