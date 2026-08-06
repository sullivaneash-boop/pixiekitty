"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site, type ArchiveEntry } from "@/data/site";
import { motionTokens } from "@/lib/motion";

function ArchiveArtwork({ entry, expanded = false }: { entry: ArchiveEntry; expanded?: boolean }) {
  return (
    <div className={`archive-art archive-art--${entry.variant} ${expanded ? "is-expanded" : ""}`}>
      <div className="archive-art__orb" />
      <div className="archive-art__scanlines" />
      <Image src={entry.icon} alt="" width={480} height={480} />
      <span className="archive-art__index">{entry.id}.pxi</span>
      <strong>{entry.title}</strong>
    </div>
  );
}

export function VisualArchive() {
  const [selected, setSelected] = useState<ArchiveEntry | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <section className="act archive-act" id="visuals" aria-labelledby="visuals-title">
      <div className="archive-heading">
        <div>
          <div className="act-label"><span>04</span> VISUAL ARCHIVE</div>
          <h2 id="visuals-title">OPEN THE<br /><em>PIXIE FILES.</em></h2>
        </div>
        <p>Four abstract placeholders keep the world intact until final artist imagery arrives. Tap any file to expand it.</p>
      </div>
      <div className="archive-stack">
        {site.archive.map((entry, index) => (
          <motion.button
            type="button"
            className={`archive-card archive-card--${index + 1}`}
            onClick={() => setSelected(entry)}
            key={entry.id}
            initial={reduced ? false : { opacity: 0, y: 50, rotate: index % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }}
            whileHover={reduced ? undefined : { y: -14, rotate: 0, zIndex: 5 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...motionTokens.component, delay: index * 0.08 }}
            aria-label={`Expand ${entry.title}`}
          >
            <ArchiveArtwork entry={entry} />
            <span className="archive-card__caption"><b>{entry.title}</b>{entry.caption}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="archive-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} expanded artwork`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="archive-modal__content"
              initial={reduced ? false : { scale: 0.82, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={reduced ? undefined : { scale: 0.9 }}
              transition={motionTokens.component}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={() => setSelected(null)} aria-label="Close expanded artwork" autoFocus>CLOSE ×</button>
              <ArchiveArtwork entry={selected} expanded />
              <p>{selected.caption} · abstract replacement point for licensed artist media</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
