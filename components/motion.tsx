"use client";

import { motion } from "framer-motion";

export const MotionDiv = motion.div;

export const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const transition = {
  duration: 0.32,
  ease: [0.23, 1, 0.32, 1] as const,
};
