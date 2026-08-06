# Pixiekitty interactive website — first concept

A polished one-page artist experience built around the fictional **Pixie Player**: an original transforming compact/MP3/phone object that carries music, biography, visuals, shows, and contact through one continuous world.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

The project uses Next.js App Router, React, strict TypeScript, Tailwind CSS, authored CSS custom properties, and Motion. It has no database, CMS, authentication, or environment variables. At runtime, the server route requests the authorized preview metadata from Apple&apos;s iTunes Search API.

## Content replacement

Shared artist copy, the featured track, live-status text, booking details, and verified social destinations live in `src/data/site.ts`. Music identifiers and official streaming destinations live in `src/lib/music-config.ts`. The custom player streams Apple&apos;s official 30-second preview of “Pixiedust” only after a user presses play; the audio is never downloaded or stored in this repository.

## Music preview flow

`GET /api/music-preview` checks the configured Sugar Rush album through Apple&apos;s iTunes Search API, validates the artist and track names, and returns only the original remote preview URL plus the metadata needed by the custom player. If the album lookup has no valid match, the route safely tries the configured search fallback. Both upstream and route responses use `no-store`.

## Vercel deployment

Import this repository into Vercel or run:

```bash
npx vercel
```

No environment variables or additional services are required.

Design decisions and tokens are documented in [design.md](./design.md). Supplied and derived assets are documented in [ASSETS.md](./ASSETS.md).
