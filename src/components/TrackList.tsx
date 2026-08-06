"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import type { PlayerState } from "@/types/music";

type TrackListProps = {
  playerState: PlayerState;
  disabled: boolean;
  onToggle: () => void;
};

export function TrackList({ playerState, disabled, onToggle }: TrackListProps) {
  const track = site.tracks[0];
  const playing = playerState === "playing";
  const reduced = useReducedMotion();

  return (
    <div className="track-list">
      <div className="track-list__head">
        <span>TRACK</span><span>TITLE / ALBUM</span><span>TIME</span>
      </div>
      <motion.button
        type="button"
        className="is-active"
        onClick={onToggle}
        whileTap={reduced || disabled ? undefined : { x: 5 }}
        aria-pressed={playing}
        aria-label={`${playing ? "Pause" : "Play"} ${track.title} by ${track.artistName}`}
        disabled={disabled}
      >
        <span>01</span>
        <span><strong>{track.title}</strong><small>{track.album}</small></span>
        <span>{track.duration}</span>
      </motion.button>
      <div className="platform-links" aria-label="Streaming platforms">
        {site.release.links.map((link) => (
          <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>{link.label} ↗</a>
        ))}
      </div>
    </div>
  );
}
