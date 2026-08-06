"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PixiePlayer } from "@/components/PixiePlayer";
import { site } from "@/data/site";
import { motionTokens } from "@/lib/motion";

export function AboutReveal() {
  const reduced = useReducedMotion();

  return (
    <section className="act about-act" id="about" aria-labelledby="about-title">
      <div className="act-label"><span>03</span> WHO IS PIXIEKITTY?</div>
      <div className="about-grid">
        <div className="about-device">
          <PixiePlayer mode="about" />
          <Image className="about-bow" src={site.assetPaths.bow} alt="" width={190} height={145} />
        </div>
        <div className="about-copy">
          <p className="ui-label">compact opened · feelings detected</p>
          <h2 id="about-title">SWEET<br />ESCAPE,<br /><em>SHARP EDGE.</em></h2>
          <p className="about-copy__statement">{site.about}</p>
          <div className="system-messages">
            {site.statement.map((line, index) => (
              <motion.p
                key={line}
                initial={reduced ? false : { opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...motionTokens.component, delay: index * 0.12 }}
              >
                <span>0{index + 1}</span>{line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
