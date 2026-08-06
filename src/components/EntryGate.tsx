"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BubbleButton } from "@/components/BubbleButton";
import { site } from "@/data/site";
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
      <Image
        className="entry-gate__wand"
        src={site.assetPaths.wand}
        alt=""
        width={210}
        height={210}
        preload
      />
      <div className="entry-gate__copy">
        <p className="ui-label">incoming transmission</p>
        <h2 id="entry-title">PIXIEKITTY</h2>
        <p>a dreamy little machine is calling...</p>
        <BubbleButton size="large" onClick={onEnter} autoFocus aria-label="Enter the Pixiekitty experience">
          ENTER THE SIGNAL
        </BubbleButton>
        <span className="entry-gate__note">sound stays off · no surprises</span>
      </div>
    </motion.div>
  );
}
