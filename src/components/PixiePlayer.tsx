"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BubbleButton } from "@/components/BubbleButton";
import { site, type Track } from "@/data/site";
import { motionTokens } from "@/lib/motion";

type PixiePlayerProps = {
  mode?: "hero" | "music" | "about" | "shows" | "contact";
  playing?: boolean;
  progress?: number;
  track?: Track;
  onToggle?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

export function PixiePlayer({
  mode = "hero",
  playing = false,
  progress = 28,
  track = site.tracks[0],
  onToggle,
  onPrevious,
  onNext,
}: PixiePlayerProps) {
  const reduced = useReducedMotion();
  const interactive = Boolean(onToggle);

  return (
    <motion.div
      className={`pixie-player pixie-player--${mode}`}
      initial={reduced ? false : { opacity: 0, y: 48, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={motionTokens.scene}
    >
      <div className="player-antenna" aria-hidden="true">
        <span />
      </div>
      <div className="player-shell">
        <div className="player-shell__chrome" aria-hidden="true" />
        <div className="player-brandline">
          <span>PK–01</span>
          <span className="player-status"><i /> DREAM MODE</span>
        </div>
        <div className="player-screen">
          <div className="player-screen__shine" aria-hidden="true" />
          <div className="screen-topline">
            <span>{mode === "about" ? "WHO.IS.SHE" : mode === "contact" ? "PIXIE-LINE" : "NOW GLOWING"}</span>
            <span>{site.release.year}</span>
          </div>
          {mode === "about" ? (
            <div className="screen-about">
              <span className="screen-about__cursor">&gt;</span>
              <p>{site.about}</p>
            </div>
          ) : mode === "shows" ? (
            <div className="screen-ticket">
              <span>ADMIT ONE DREAMER</span>
              <strong>LIVE SIGNAL</strong>
              <small>dates loading...</small>
            </div>
          ) : mode === "contact" ? (
            <div className="screen-message">
              <span>new message</span>
              <strong>let&apos;s make magic?</strong>
              <small>booking + collaborations</small>
            </div>
          ) : (
            <div className="screen-track">
              <div className={`screen-orb ${playing ? "is-playing" : ""}`} aria-hidden="true">
                <Image
                  src={site.assetPaths.cd}
                  alt=""
                  width={480}
                  height={480}
                  preload={mode === "hero"}
                />
              </div>
              <div>
                <span className="screen-track__type">{site.release.type}</span>
                <strong>{track.title}</strong>
                <span className="screen-track__note">{track.note}</span>
              </div>
            </div>
          )}
          <div className="progress" aria-label={`Silent demo progress ${Math.round(progress)} percent`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="screen-footer">
            <span>00:{String(Math.round((progress / 100) * 18)).padStart(2, "0")}</span>
            <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /></span>
            <span>{track.duration}</span>
          </div>
        </div>
        {interactive ? (
          <div className="player-controls">
            <button className="skip-control" type="button" onClick={onPrevious} aria-label="Previous demo track">‹</button>
            <BubbleButton
              size="large"
              active={playing}
              onClick={onToggle}
              aria-label={playing ? "Pause silent playback demonstration" : "Play silent playback demonstration"}
            >
              {playing ? "Ⅱ" : "▶"}
            </BubbleButton>
            <button className="skip-control" type="button" onClick={onNext} aria-label="Next demo track">›</button>
          </div>
        ) : (
          <div className="player-controls player-controls--display" aria-hidden="true">
            <span className="skip-control">‹</span>
            <span className="bubble-button bubble-button--large"><span>▶</span></span>
            <span className="skip-control">›</span>
          </div>
        )}
        <div className="player-caption">
          <span>NO AUTOPLAY</span>
          <strong>{playing ? "silent demo playing" : "press to preview"}</strong>
        </div>
      </div>
      <div className="player-charm-chain" aria-hidden="true">
        <Image
          src={site.assetPaths.heartChain}
          alt=""
          width={480}
          height={480}
          preload={mode === "hero"}
        />
      </div>
    </motion.div>
  );
}
