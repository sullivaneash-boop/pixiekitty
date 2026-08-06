"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BubbleButton } from "@/components/BubbleButton";
import { site, type Track } from "@/data/site";
import { motionTokens } from "@/lib/motion";
import type { MusicPreview, PlayerState } from "@/types/music";

type PixiePlayerProps = {
  mode?: "hero" | "music" | "about" | "shows" | "contact";
  playerState?: PlayerState;
  progress?: number;
  currentTime?: number;
  duration?: number;
  track?: Track;
  preview?: MusicPreview | null;
  message?: string;
  playbackPending?: boolean;
  onToggle?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
};

const STATE_LABELS: Record<PlayerState, string> = {
  loading: "loading preview",
  ready: "ready · press play",
  playing: "official preview playing",
  paused: "preview paused",
  ended: "preview complete",
  unavailable: "preview unavailable",
  error: "preview temporarily unavailable",
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  return `${minutes}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

export function PixiePlayer({
  mode = "hero",
  playerState = "ready",
  progress = 0,
  currentTime = 0,
  duration = 0,
  track = site.tracks[0],
  preview = null,
  message,
  playbackPending = false,
  onToggle,
  onPrevious,
  onNext,
}: PixiePlayerProps) {
  const reduced = useReducedMotion();
  const interactive = Boolean(onToggle);
  const playing = playerState === "playing";
  const playDisabled =
    playbackPending ||
    playerState === "loading" ||
    playerState === "unavailable" ||
    playerState === "error";
  const trackName = preview?.trackName ?? track.title;
  const artistName = preview?.artistName ?? track.artistName;
  const collectionName = preview?.collectionName ?? site.release.title;
  const displayDuration = duration > 0 ? duration : 30;
  const stateLabel = message ?? STATE_LABELS[playerState];
  const buttonLabel = playing
    ? `Pause ${trackName} by ${artistName}`
    : `Play ${trackName} by ${artistName}`;

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
          <span className={`player-status ${playing ? "is-playing" : ""}`}><i /> DREAM MODE</span>
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
              <div
                className={`screen-orb ${preview?.artworkUrl ? "has-artwork" : ""} ${playing ? "is-playing" : ""}`}
              >
                {preview?.artworkUrl ? (
                  <Image
                    src={preview.artworkUrl}
                    alt={`${collectionName} album artwork`}
                    width={600}
                    height={600}
                    preload={mode === "hero"}
                  />
                ) : (
                  <Image
                    src={site.assetPaths.cd}
                    alt=""
                    width={480}
                    height={480}
                    preload={mode === "hero"}
                  />
                )}
              </div>
              <div>
                <span className="screen-track__type">{collectionName} · Apple preview</span>
                <strong>{trackName}</strong>
                <span className="screen-track__note">{artistName}</span>
              </div>
            </div>
          )}
          <div
            className="progress"
            role={interactive ? "progressbar" : undefined}
            aria-hidden={interactive ? undefined : true}
            aria-label={interactive ? `${trackName} preview progress` : undefined}
            aria-valuemin={interactive ? 0 : undefined}
            aria-valuemax={interactive ? 100 : undefined}
            aria-valuenow={interactive ? Math.round(progress) : undefined}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="screen-footer">
            <span>{formatTime(currentTime)}</span>
            <span className={`equalizer ${playing ? "is-active" : ""}`} aria-hidden="true"><i /><i /><i /><i /></span>
            <span>{formatTime(displayDuration)}</span>
          </div>
        </div>
        {interactive ? (
          <div className="player-controls">
            {onPrevious ? (
              <button className="skip-control" type="button" onClick={onPrevious} aria-label="Previous track">‹</button>
            ) : <span className="skip-control" aria-hidden="true">‹</span>}
            <BubbleButton
              size="large"
              active={playing}
              onClick={onToggle}
              disabled={playDisabled}
              aria-busy={playbackPending || playerState === "loading"}
              aria-label={buttonLabel}
            >
              {playbackPending || playerState === "loading" ? "…" : playing ? "Ⅱ" : "▶"}
            </BubbleButton>
            {onNext ? (
              <button className="skip-control" type="button" onClick={onNext} aria-label="Next track">›</button>
            ) : <span className="skip-control" aria-hidden="true">›</span>}
          </div>
        ) : (
          <div className="player-controls player-controls--display" aria-hidden="true">
            <span className="skip-control">‹</span>
            <span className="bubble-button bubble-button--large"><span>▶</span></span>
            <span className="skip-control">›</span>
          </div>
        )}
        <div className="player-caption" aria-live={interactive ? "polite" : undefined}>
          <span>{interactive ? "30 SEC PREVIEW" : "NO AUTOPLAY"}</span>
          <strong>{interactive ? stateLabel : "display mode"}</strong>
        </div>
      </div>
      {interactive && (
        <div className="player-attribution">
          <span>30-second preview · provided courtesy of iTunes</span>
          <a href={preview?.appleMusicUrl ?? site.release.links[0].href} target="_blank" rel="noopener noreferrer">
            Listen in full on Apple Music ↗
          </a>
        </div>
      )}
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
