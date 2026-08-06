"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { AboutReveal } from "@/components/AboutReveal";
import { CharmNav } from "@/components/CharmNav";
import { EntryGate } from "@/components/EntryGate";
import { LiveConnect } from "@/components/LiveConnect";
import { PixiePlayer } from "@/components/PixiePlayer";
import { SparkleField } from "@/components/SparkleField";
import { TrackList } from "@/components/TrackList";
import { VisualArchive } from "@/components/VisualArchive";
import { site } from "@/data/site";
import { motionTokens } from "@/lib/motion";

export function PixieExperience() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);
  const [trackIndex, setTrackIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [entered]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 0 : value + 0.35));
    }, 120);
    const stopWhenHidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", stopWhenHidden);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", stopWhenHidden);
    };
  }, [playing]);

  const selectTrack = (index: number) => {
    setTrackIndex(index);
    setProgress(0);
    setPlaying(true);
  };

  const stepTrack = (direction: -1 | 1) => {
    setTrackIndex((current) => (current + direction + site.tracks.length) % site.tracks.length);
    setProgress(0);
  };

  return (
    <>
      <AnimatePresence>{!entered && <EntryGate onEnter={() => setEntered(true)} />}</AnimatePresence>
      <main id="top">
        <section className="hero-act" aria-labelledby="hero-title">
          <SparkleField />
          <div className="hero-cloud hero-cloud--one" aria-hidden="true" />
          <div className="hero-cloud hero-cloud--two" aria-hidden="true" />
          <header className="signal-header">
            <a className="signal-logo" href="#top" aria-label="Pixiekitty home">PK<span>✦</span></a>
            <span>TRANSMISSION 001</span>
            <a href="#contact">BOOKING ↗</a>
          </header>
          <div className="hero-title-wrap">
            <motion.p
              initial={reduced ? false : { opacity: 0, x: -30 }}
              animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ ...motionTokens.component, delay: 0.12 }}
            >{site.eyebrow}</motion.p>
            <motion.h1
              id="hero-title"
              initial={reduced ? false : { opacity: 0, y: 40, scale: 0.95 }}
              animate={entered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ ...motionTokens.scene, delay: 0.08 }}
            >PIXIE<span>KITTY</span></motion.h1>
          </div>
          <div className="hero-stage">
            <div className="hero-note hero-note--left">
              <span>MADE FOR</span><strong>late nights +<br />soft escapes</strong>
            </div>
            <PixiePlayer
              mode="hero"
              playing={playing}
              progress={progress}
              track={site.tracks[trackIndex]}
              onToggle={() => setPlaying((value) => !value)}
              onPrevious={() => stepTrack(-1)}
              onNext={() => stepTrack(1)}
            />
            <div className="hero-note hero-note--right">
              <span>CURRENT SIGNAL</span><strong>{site.release.title}</strong><small>{site.release.type}</small>
            </div>
          </div>
          <CharmNav />
          <div className="hero-scroll" aria-hidden="true"><span>SCROLL TO UNFOLD</span><i /></div>
        </section>

        <section className="act music-act" id="music" aria-labelledby="music-title">
          <div className="music-marquee" aria-hidden="true">
            <span>PLAY IT LOUDER ✦ PLAY IT LOUDER ✦ PLAY IT LOUDER ✦ PLAY IT LOUDER ✦</span>
          </div>
          <div className="act-label"><span>02</span> MUSIC PLAYER</div>
          <div className="music-grid">
            <div className="music-copy">
              <p className="ui-label">the player found a heartbeat</p>
              <h2 id="music-title">PRESS<br /><em>PLAY.</em></h2>
              <p>{site.tagline}</p>
              <TrackList active={trackIndex} onSelect={selectTrack} />
            </div>
            <div className="music-device">
              <PixiePlayer
                mode="music"
                playing={playing}
                progress={progress}
                track={site.tracks[trackIndex]}
                onToggle={() => setPlaying((value) => !value)}
                onPrevious={() => stepTrack(-1)}
                onNext={() => stepTrack(1)}
              />
              <Image className="music-wand" src={site.assetPaths.wand} alt="" width={180} height={180} />
            </div>
          </div>
        </section>

        <AboutReveal />
        <VisualArchive />
        <LiveConnect />
      </main>
    </>
  );
}
