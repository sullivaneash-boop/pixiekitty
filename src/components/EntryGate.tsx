"use client";

import { motion, useReducedMotion } from "motion/react";
import { BubbleButton } from "@/components/BubbleButton";
import { motionTokens } from "@/lib/motion";

export function EntryGate({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="entry-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-title"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 1.05, filter: reduced ? "none" : "blur(8px)" }}
      transition={motionTokens.scene}
    >
      <div className="entry-gate__noise" aria-hidden="true" />
      <div className="entry-gate__copy">
        <p className="ui-label">PIXIEKITTY IS ONLINE</p>
        <h2 id="entry-title">PIXIEKITTY</h2>
        <p>your favorite escape just called</p>
        <BubbleButton size="large" onClick={onEnter} autoFocus aria-label="Enter Pixie Mode">
          ENTER PIXIE MODE
        </BubbleButton>
      </div>
    </motion.div>
  );
}
