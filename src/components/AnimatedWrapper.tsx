import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

// Optimized Spring configurations for smooth UI transitions
const transitionSpring = {
  type: "spring" as const,
  damping: 30, // ⚡ Increased slightly to reduce aggressive jittering over the canvas
  stiffness: 140,
  mass: 0.8,
};

const fadeInUpVariants = {
  hidden: {
    y: 24,
    opacity: 0,
    filter: "blur(4px)" // ✨ Added a smooth exit/entry blur that complements the glassmorphism layout
  },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: transitionSpring,
  },
};

export function FadeInUp({ children, className, ...props }: AnimatedWrapperProps) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      layout="position" // ⚡ Crucial: Keeps elements aligned gracefully if content sizes scale or change dynamically
      className={className}
      style={{ willChange: "transform, opacity" }} // Hardware accelerates performance above the active background layers
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: AnimatedWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06, // ⚡ Adjusted timings slightly for a more organic presentation flow
            delayChildren: 0.02,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}