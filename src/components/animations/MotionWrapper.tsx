import { motion, type HTMLMotionProps } from 'framer-motion';
import type { FC, ReactNode } from 'react';

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export const MotionWrapper: FC<Props> = ({ children, ...props }) => {
  const defaultAnimations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  };

  return (
    <motion.div
      {...defaultAnimations}
      {...props}
    >
      {children}
    </motion.div>
  );
}; 