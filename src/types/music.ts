export type PlayerState =
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "ended"
  | "unavailable"
  | "error";

export type MusicPreview = {
  artistName: string;
  trackName: string;
  collectionName: string;
  previewUrl: string;
  artworkUrl: string | null;
  appleMusicUrl: string;
  durationMilliseconds: number | null;
  source: "apple";
};

export type MusicPreviewError = {
  error: string;
};
