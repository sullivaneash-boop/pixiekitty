import { musicConfig } from "@/lib/music-config";
import type { MusicPreview } from "@/types/music";

export const dynamic = "force-dynamic";

const LOOKUP_URL =
  "https://itunes.apple.com/lookup?id=1891156986&entity=song&country=US";
const SEARCH_URL =
  "https://itunes.apple.com/search?term=Pixiekitty%20Pixiedust&country=US&media=music&entity=song&limit=25";
const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

type AppleResult = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isExpectedTrack(result: AppleResult): boolean {
  const artistName = readString(result.artistName);
  const trackName = readString(result.trackName);

  return (
    result.wrapperType === "track" &&
    artistName?.toLowerCase() === musicConfig.artistName.toLowerCase() &&
    trackName?.toLowerCase() === musicConfig.preferredTrackName.toLowerCase() &&
    readString(result.previewUrl) !== null
  );
}

function getApplePreviewUrl(value: unknown): string | null {
  const candidate = readString(value);
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    const isAppleAudioHost =
      url.hostname === "itunes.apple.com" ||
      url.hostname.endsWith(".itunes.apple.com");
    return url.protocol === "https:" && isAppleAudioHost ? url.toString() : null;
  } catch {
    return null;
  }
}

function getLargerArtworkUrl(value: unknown): string | null {
  const candidate = readString(value);
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || !url.hostname.endsWith(".mzstatic.com")) {
      return null;
    }

    url.pathname = url.pathname.replace(
      /\/\d+x\d+bb\.(jpg|jpeg|png)$/i,
      "/600x600bb.$1",
    );
    return url.toString();
  } catch {
    return null;
  }
}

async function requestAppleResults(url: string): Promise<AppleResult[]> {
  try {
    // no-store is intentional: Apple remains the live source and preview URLs are never cached or persisted by this app.
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return [];

    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.results)) return [];

    return payload.results.filter(isRecord);
  } catch {
    // A failed album lookup intentionally falls through to the search fallback.
    return [];
  }
}

function unavailableResponse() {
  return Response.json(
    { error: "Preview unavailable" },
    { status: 404, headers: NO_STORE_HEADERS },
  );
}

export async function GET() {
  try {
    const lookupResults = await requestAppleResults(LOOKUP_URL);
    let match = lookupResults.find(isExpectedTrack);

    if (!match) {
      const searchResults = await requestAppleResults(SEARCH_URL);
      match = searchResults.find(isExpectedTrack);
    }

    if (!match) return unavailableResponse();

    const previewUrl = getApplePreviewUrl(match.previewUrl);
    const artistName = readString(match.artistName);
    const trackName = readString(match.trackName);
    if (!previewUrl || !artistName || !trackName) return unavailableResponse();

    const trackTime = match.trackTimeMillis;
    const durationMilliseconds =
      typeof trackTime === "number" && Number.isFinite(trackTime) && trackTime > 0
        ? trackTime
        : null;

    const preview: MusicPreview = {
      artistName,
      trackName,
      collectionName: readString(match.collectionName) ?? "Sugar Rush",
      previewUrl,
      artworkUrl: getLargerArtworkUrl(match.artworkUrl100),
      appleMusicUrl: musicConfig.appleMusicAlbumUrl,
      durationMilliseconds,
      source: "apple",
    };

    return Response.json(preview, { headers: NO_STORE_HEADERS });
  } catch {
    return Response.json(
      { error: "Preview temporarily unavailable" },
      { status: 502, headers: NO_STORE_HEADERS },
    );
  }
}
