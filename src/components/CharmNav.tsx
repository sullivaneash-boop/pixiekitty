"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { motionTokens } from "@/lib/motion";

export function CharmNav() {
  const reduced = useReducedMotion();

  return (
    <nav className="charm-nav" aria-label="Explore Pixiekitty">
      {site.navigation.map((item, index) => (
        <motion.a
          className={`charm charm--${index + 1}`}
          href={item.href}
          key={item.label}
          whileHover={reduced ? undefined : { y: -8, rotate: index % 2 ? 4 : -4 }}
          whileTap={reduced ? undefined : { scale: 0.93 }}
          transition={motionTokens.hover}
        >
          <span className="charm__halo" aria-hidden="true" />
          <Image src={item.icon} alt="" width={76} height={76} loading="eager" />
          <span>{item.label}</span>
        </motion.a>
      ))}
    </nav>
  );
}
