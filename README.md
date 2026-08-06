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

The project uses Next.js App Router, React, strict TypeScript, Tailwind CSS, authored CSS custom properties, and Motion. It has no database, CMS, authentication, environment variables, or external runtime service.

## Content replacement

Edit `src/data/site.ts` to replace provisional tracks, streaming destinations, visual archive entries, shows, booking details, and social links. The current media player is a silent demonstration because no licensed audio was supplied; it never autoplays.

## Vercel deployment

Import this repository into Vercel or run:

```bash
npx vercel
```

No environment variables or additional services are required.

Design decisions and tokens are documented in [design.md](./design.md). Supplied and derived assets are documented in [ASSETS.md](./ASSETS.md).
