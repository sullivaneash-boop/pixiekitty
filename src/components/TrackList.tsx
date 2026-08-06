"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";

export function TrackList({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <div className="track-list">
      <div className="track-list__head">
        <span>TRACK</span><span>TITLE / FILE</span><span>TIME</span>
      </div>
      {site.tracks.map((track, index) => (
        <motion.button
          type="button"
          className={active === index ? "is-active" : ""}
          key={track.title}
          onClick={() => onSelect(index)}
          whileTap={{ x: 5 }}
          aria-pressed={active === index}
        >
          <span>0{index + 1}</span>
          <span><strong>{track.title}</strong><small>{track.note}</small></span>
          <span>{track.duration}</span>
        </motion.button>
      ))}
      <div className="platform-links" aria-label="Streaming platforms">
        {site.release.links.map((link) => (
          <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} ↗</a>
        ))}
      </div>
    </div>
  );
}
