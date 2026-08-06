import { musicConfig } from "@/lib/music-config";

export type Track = {
  artistName: string;
  title: string;
  album: string;
  duration: string;
};

export type ArchiveEntry = {
  id: string;
  title: string;
  caption: string;
  variant: "halo" | "heartbreak" | "night" | "signal";
  icon: string;
};

export const site = {
  artist: "Pixiekitty",
  year: "2026",
  eyebrow: "your favorite escape just called",
  positioning: [
    "DREAMY POP FOR",
    "LATE NIGHTS,",
    "PRETTY CHAOS +",
    "GIRLS WHO FEEL EVERYTHING.",
  ],
  tagline: "A tiny player for big feelings.",
  statement: [
    "glitter with feelings",
    "heartbreak you can dance to",
    "freedom in hot pink",
  ],
  about:
    "Pixiekitty turns feelings into fantasy. Her world is dreamy, colorful, flirtatious and a little unreal, where beauty, heartbreak, freedom and desire can all exist at once.",
  release: {
    title: "Sugar Rush",
    type: "official Apple preview",
    links: [
      { label: "Apple Music", href: musicConfig.appleMusicAlbumUrl },
      { label: "Spotify", href: musicConfig.spotifyArtistUrl },
    ],
  },
  tracks: [
    {
      artistName: musicConfig.artistName,
      title: musicConfig.preferredTrackName,
      album: "Sugar Rush",
      duration: "2:23",
    },
  ] satisfies Track[],
  navigation: [
    { label: "Music", href: "#music", icon: "/assets/icons/headphones-3d.webp" },
    { label: "About", href: "#about", icon: "/assets/icons/pixel-heart-3d.webp" },
    { label: "Visuals", href: "#visuals", icon: "/assets/icons/folder-3d.webp" },
    { label: "Shows", href: "#shows", icon: "/assets/icons/pixel-star-3d.webp" },
    { label: "Contact", href: "#contact", icon: "/assets/icons/lips-3d.webp" },
  ],
  archive: [
    {
      id: "after-dark",
      title: "AFTER DARK",
      caption: "late-night looks",
      variant: "halo",
      icon: "/assets/icons/butterfly-3d.webp",
    },
    {
      id: "pink-room",
      title: "PINK ROOM",
      caption: "all dressed up",
      variant: "heartbreak",
      icon: "/assets/icons/pixel-heart-3d.webp",
    },
    {
      id: "soft-focus",
      title: "SOFT FOCUS",
      caption: "pretty in a blur",
      variant: "night",
      icon: "/assets/icons/lips-3d.webp",
    },
    {
      id: "sugar-rush",
      title: "SUGAR RUSH",
      caption: "sweet with an edge",
      variant: "signal",
      icon: "/assets/icons/burst-3d.webp",
    },
  ] satisfies ArchiveEntry[],
  live: {
    eyebrow: "ADMIT ONE DREAMER",
    artist: "PIXIEKITTY",
    status: "DATES COMING SOON",
    note: "New dates are coming. Stay close.",
  },
  contact: {
    email: "Pixiekitty@blissed.ski",
    label: "booking + collaborations",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/pixiekitty555/" },
  ],
  assetPaths: {
    bow: "/assets/icons/bow-3d.webp",
    sparkles: "/assets/icons/sparkles-3d.webp",
    butterfly: "/assets/icons/butterfly-3d.webp",
    cd: "/assets/icons/cd-3d.webp",
    lips: "/assets/icons/lips-3d.webp",
  },
} as const;
