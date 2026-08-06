"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site, type ArchiveEntry } from "@/data/site";
import { motionTokens } from "@/lib/motion";

function ArchiveArtwork({ entry, expanded = false }: { entry: ArchiveEntry; expanded?: boolean }) {
  return (
    <div className={`archive-art ${expanded ? "is-expanded" : ""}`}>
      <Image
        src={entry.image}
        alt={entry.alt}
        fill
        sizes={expanded ? "(max-width: 820px) 90vw, 760px" : "(max-width: 640px) 78vw, (max-width: 1180px) 50vw, 33vw"}
      />
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
          <p className="ui-label">THE PIXIE FILES</p>
          <h2 id="visuals-title">OPEN THE<br /><em>PRETTY LITTLE<br />ARCHIVE.</em></h2>
        </div>
        <p>
          A growing collection of looks, late nights and moments from Pixie&apos;s world.
          <strong>TAP A PHOTO TO OPEN</strong>
        </p>
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
            aria-label={`Expand archive photo ${index + 1}`}
          >
            <ArchiveArtwork entry={entry} />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="archive-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded archive photo"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
