export type Track = {
  title: string;
  duration: string;
  note: string;
};

export type ArchiveEntry = {
  id: string;
  title: string;
  caption: string;
  variant: "halo" | "heartbreak" | "night" | "signal";
  icon: string;
};

export type Show = {
  date: string;
  city: string;
  venue: string;
  note: string;
  provisional: boolean;
};

export const site = {
  artist: "Pixiekitty",
  eyebrow: "dream-pop transmission 001",
  tagline: "A tiny machine for big feelings.",
  statement: [
    "glitter on the outside",
    "heartbreak in the circuitry",
    "freedom at full volume",
  ],
  about:
    "Pixiekitty makes dreamy pop for late nights, soft escapes, and the moment you choose yourself again.",
  release: {
    title: "PIXIE DUST",
    type: "current signal · demo mode",
    year: "2026",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/" },
      { label: "Apple Music", href: "https://music.apple.com/" },
      { label: "SoundCloud", href: "https://soundcloud.com/" },
    ],
  },
  tracks: [
    { title: "Pixie Dust", duration: "03:18", note: "lead transmission" },
    { title: "Kiss The Static", duration: "02:54", note: "after-dark mix" },
    { title: "Crybaby Hotline", duration: "03:07", note: "unreleased preview" },
  ] satisfies Track[],
  navigation: [
    { label: "Music", href: "#music", icon: "/assets/icons/headphones.webp" },
    { label: "About", href: "#about", icon: "/assets/icons/pixel-heart.webp" },
    { label: "Visuals", href: "#visuals", icon: "/assets/icons/folder.webp" },
    { label: "Shows", href: "#shows", icon: "/assets/icons/pixel-star.webp" },
    { label: "Contact", href: "#contact", icon: "/assets/icons/lips.webp" },
  ],
  archive: [
    {
      id: "halo",
      title: "Halo Test",
      caption: "soft focus / hard feelings",
      variant: "halo",
      icon: "/assets/icons/butterfly.webp",
    },
    {
      id: "heartbreak",
      title: "Heartbreak OS",
      caption: "saved at 3:17 AM",
      variant: "heartbreak",
      icon: "/assets/icons/pixel-heart.webp",
    },
    {
      id: "night",
      title: "Night Mode",
      caption: "backstage signal study",
      variant: "night",
      icon: "/assets/icons/lips.webp",
    },
    {
      id: "signal",
      title: "Signal Bloom",
      caption: "transmission still loading",
      variant: "signal",
      icon: "/assets/icons/burst.webp",
    },
  ] satisfies ArchiveEntry[],
  shows: [
    {
      date: "SOON",
      city: "YOUR CITY",
      venue: "signal not found yet",
      note: "New live dates will appear here.",
      provisional: true,
    },
  ] satisfies Show[],
  contact: {
    email: "booking@pixiekitty.com",
    label: "booking + collaborations",
    provisional: true,
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  assetPaths: {
    bow: "/assets/icons/bow.webp",
    wand: "/assets/icons/wand.webp",
    sparkles: "/assets/icons/sparkles.webp",
    heartChain: "/assets/icons/heart-chain.webp",
    butterfly: "/assets/icons/butterfly.webp",
    cd: "/assets/icons/cd.webp",
    lips: "/assets/icons/lips.webp",
  },
} as const;
