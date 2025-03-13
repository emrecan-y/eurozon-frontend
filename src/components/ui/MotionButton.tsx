import {
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "motion/react";
import { MouseEventHandler } from "react";

type MotionButtonProps = {
  id?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  initial?: boolean | VariantLabels | TargetAndTransition;
  exit?: VariantLabels | TargetAndTransition;
  animate?: boolean | VariantLabels | TargetAndTransition | AnimationControls;
  transition?: Transition;
  disableAnimation?: boolean;
  layout?: boolean | "position" | "size" | "preserve-aspect";
  whileHover?: VariantLabels | TargetAndTransition;
  whileTap?: VariantLabels | TargetAndTransition;
};

function MotionButton({
  id,
  className,
  onClick,
  children,
  type = "button",
  initial,
  exit,
  animate,
  transition,
  disableAnimation,
  layout,
  whileHover = {
    scale: 1.08,
    transition: { duration: 0.15 },
  },
  whileTap = {
    scale: 0.92,
    transition: { duration: 0.15 },
  },
}: MotionButtonProps) {
  className += " hover:cursor-pointer";
  if (disableAnimation) {
    return (
      <button id={id} className={className} onClick={onClick} type={type}>
        {children}
      </button>
    );
  } else {
    return (
      <motion.button
        id={id}
        className={className}
        onClick={onClick}
        type={type}
        whileHover={whileHover}
        whileTap={whileTap}
        initial={initial}
        exit={exit}
        animate={animate}
        transition={transition}
        layout={layout}
      >
        {children}
      </motion.button>
    );
  }
}

export default MotionButton;
