"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PixiePlayer } from "@/components/PixiePlayer";
import { site } from "@/data/site";
import { motionTokens } from "@/lib/motion";

export function LiveConnect() {
  const reduced = useReducedMotion();
  const live = site.live;

  return (
    <>
      <section className="act shows-act" id="shows" aria-labelledby="shows-title">
        <div className="act-label"><span>05</span> LIVE</div>
        <div className="shows-grid">
          <div className="shows-copy">
            <p className="ui-label">MEET ME</p>
            <h2 id="shows-title"><em>AFTER DARK.</em></h2>
            <p className="shows-copy__note">{live.note}</p>
            <motion.article
              className="show-ticket"
              initial={reduced ? false : { opacity: 0, x: -80, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={motionTokens.scene}
            >
              <div className="show-ticket__stub"><span>PK</span><b>LIVE</b></div>
              <div className="show-ticket__body">
                <span>{live.eyebrow}</span>
                <strong>{live.artist}</strong>
                <p>{live.status}</p>
              </div>
              <div className="barcode" aria-hidden="true" />
            </motion.article>
          </div>
          <PixiePlayer mode="shows" />
        </div>
      </section>

      <section className="act contact-act" id="contact" aria-labelledby="contact-title">
        <div className="contact-glow" aria-hidden="true" />
        <Image className="contact-lips" src={site.assetPaths.lips} alt="" width={480} height={480} />
        <div className="contact-grid">
          <PixiePlayer mode="contact" />
          <div className="contact-copy">
            <div className="act-label"><span>06</span> BOOKING</div>
            <p className="ui-label">BOOK PIXIE</p>
            <h2 id="contact-title">BRING PIXIE<br /><em>INTO YOUR WORLD.</em></h2>
            <p>For shows, collaborations and anything worth dressing up for.</p>
            <a className="contact-cta" href={`mailto:${site.contact.email}`}>
              <span>{site.contact.label}</span>
              <strong>{site.contact.email}</strong>
              <i>↗</i>
            </a>
            <div className="social-links">
              {site.socials.map((social) => (
                <a href={social.href} target="_blank" rel="noopener noreferrer" key={social.label}>{social.label} ↗</a>
              ))}
            </div>
          </div>
        </div>
        <footer>
          <span>PIXIEKITTY © {site.year}</span>
          <a href="#top">BACK TO PIXIE ↑</a>
          <span>MADE WITH GLITTER + GOOD INTENTIONS</span>
        </footer>
      </section>
    </>
  );
}
