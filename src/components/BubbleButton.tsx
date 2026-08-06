"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

type BubbleButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  active?: boolean;
  size?: "small" | "large";
};

export function BubbleButton({
  children,
  active = false,
  size = "small",
  className = "",
  disabled = false,
  ...props
}: BubbleButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={`bubble-button bubble-button--${size} ${active ? "is-active" : ""} ${className}`}
      whileHover={reduced || disabled ? undefined : { y: -2, scale: 1.025 }}
      whileTap={reduced || disabled ? undefined : { y: 4, scale: 0.94 }}
      transition={motionTokens.press}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </motion.button>
  );
}
