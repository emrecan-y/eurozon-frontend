import { cn } from "@/lib/utils";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "motion/react";
import { forwardRef, MouseEventHandler } from "react";

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
  disableButton?: boolean;
  layout?: boolean | "position" | "size" | "preserve-aspect";
  whileHover?: VariantLabels | TargetAndTransition;
  whileTap?: VariantLabels | TargetAndTransition;
};

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  (
    {
      id,
      className = "",
      onClick,
      children,
      type = "button",
      initial,
      exit,
      animate,
      transition,
      disableAnimation,
      disableButton,
      layout,
      whileHover = {
        scale: 1.08,
        transition: { duration: 0.15 },
      },
      whileTap = {
        scale: 0.92,
        transition: { duration: 0.15 },
      },
      ...props
    }: MotionButtonProps,
    ref,
  ) => {
    if (disableButton) {
      className = cn("hover:cursor-default text-primary-bg-3", className);
      return (
        <button ref={ref} id={id} className={className} type={type} {...props}>
          {children}
        </button>
      );
    } else if (disableAnimation) {
      return (
        <button
          ref={ref}
          id={id}
          className={className}
          onClick={onClick}
          type={type}
          {...props}
        >
          {children}
        </button>
      );
    } else {
      return (
        <motion.button
          ref={ref}
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
          {...props}
        >
          {children}
        </motion.button>
      );
    }
  },
);

export default MotionButton;
