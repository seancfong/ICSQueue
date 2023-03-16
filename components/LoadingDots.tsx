import { cubicBezier, motion } from "framer-motion";
import React from "react";

const loadingContainer = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  display: "block",
  width: "0.3rem",
  height: "0.3rem",
  backgroundColor: "#999999",
  borderRadius: "0.3rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "250%",
  },
};

const loadingCircleTransition = {
  duration: 1.2,
  repeat: Infinity,
  repeatType: "reverse",
  ease: cubicBezier(0.57, 0.07, 0.11, 0.97),
};

type Props = {};

const LoadingDots = (props: Props) => {
  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        // @ts-ignore
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        // @ts-ignore
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        // @ts-ignore
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default LoadingDots;
