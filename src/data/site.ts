import { musicConfig } from "@/lib/music-config";

export type Track = {
  artistName: string;
  title: string;
  album: string;
  duration: string;
};

export type ArchiveEntry = {
  id: string;
  image: string;
  alt: string;
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
      id: "archive-01",
      image: "/assets/archive/pixiekitty-archive-01.png",
      alt: "Portrait beside illuminated bookshelves",
    },
    {
      id: "archive-02",
      image: "/assets/archive/pixiekitty-archive-02.png",
      alt: "Portrait in a pink outfit on a bed",
    },
    {
      id: "archive-03",
      image: "/assets/archive/pixiekitty-archive-03.png",
      alt: "Friends in colorful outfits sitting on laundry machines",
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
