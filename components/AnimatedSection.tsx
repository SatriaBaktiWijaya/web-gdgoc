"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.3 }
          : {
              duration: 0.6,
              delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
