# Pixiekitty first-concept design system

## Creative decision

The homepage is built around one fictional object: the **Pixie Player PK–01**. It is an asymmetrical translucent compact/MP3/phone hybrid with a chrome rim, black-glass display, bubble controls, antenna gem, and charm chain. The silhouette intentionally avoids copying an iPod, Walkman, flip phone, or existing toy. Each act reuses the same shell while changing the screen state: release player, biography terminal, live ticket, and message line.

Lazyweb evidence was used before implementation. Familiar playback controls came from strong music-player references, while SSENSE/Nike-style image hierarchy and collectible inventory patterns informed the continuous editorial flow and charm navigation. The implemented recommendation is the transforming-player direction because it gives the page one recognizable interaction plane instead of a stack of unrelated artist-site sections.

## Brand qualities

- Feminine, glossy, and flirtatious without childish copy or toy proportions.
- Playful in interaction, grounded by deep plum-black contrast and concise emotional language.
- Y2K-informed through materials and music technology, not through literal operating-system parody.
- Visually excessive at first glance, compositionally controlled through one central device and a limited accent hierarchy.

## Color roles

| Role | Value | Use |
| --- | --- | --- |
| Primary hot pink | `#F40091` | Device body, hero light, dominant accents |
| Candy pink | `#FF5DBB` | Highlights, title layers, section fields |
| Soft pink | `#FFD2EB` | Secondary copy, pearl/pink transitions |
| Pearl white | `#FFF8FC` | Readable foreground, archive field, highlights |
| Deep plum-black | `#170710` | Nightlife ground and black-glass contrast |
| Chrome light | `#EEF0F5` | Hardware edge and control highlights |
| Chrome shadow | `#9295A3` | Hardware underside and contact shadow |
| Acid lime | `#B6FF3B` | Active playback, focus, rare status signal |
| Digital cyan | `#78EFFF` | Metadata, status labels, tiny system moments |

No unrelated accent gradients are used. Gradients only simulate plastic, chrome, black glass, atmosphere, or the four abstract archive placeholders.

## Typography

Three open-source Google font families are self-hosted through `next/font`:

1. **Archivo Black** — identity and act titles. CSS stroke and layered shadows create the bubble/chrome feeling.
2. **Space Mono** — interface labels, metadata, tickets, track rows, and system messages.
3. **Manrope** — body text and readable supporting copy.

## Material recipes

- **Translucent pink plastic:** multi-stop candy/hot-pink gradient, white top glint, deep-plum inset shade.
- **Chrome edge:** white outer highlight, cool-gray ring, dark contact line.
- **Pearl shell:** near-white highlights with soft pink reflection.
- **Black glass:** plum-black gradient, cyan metadata, magenta inner bloom, diagonal reflected sheen.
- **Bubble control:** inflated gradient, top specular highlight, darker underside, `8px` contact shadow, compressed press state.
- **Rhinestone signal:** tiny white/cyan status gem with restrained glow.
- **Holographic signal:** only the Signal Bloom archive placeholder combines lime, pink, and cyan.

## Layout and responsive behavior

- Desktop hero: artist title behind a centered device, small editorial notes on either side, charms along the lower edge.
- Tablet: title and device remain centered; side notes become overlays, and all later sections become single-column.
- Mobile (`390px` baseline): device width is `86vw`; charm navigation is a labeled horizontal scroller; archive cards use swipeable snap scrolling; no required interaction depends on dragging.
- Native scrolling is preserved. No wheel interception, forced slideshow, or aggressive page snapping is used.

## Motion

Shared values live in `src/lib/motion.ts`:

- Press: `120ms`
- Hover: `200ms`
- Component reveal: `480ms`
- Scene reveal: `820ms`
- Ambient loops: `6–8s`
- Easings: `cubic-bezier(0.22, 1, 0.36, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)`

Scene motion is reserved for entry and device/card reveals. Component motion covers the player, archive expansion, and ticket. Micro-motion covers bubble compression, active progress, and charm hover. Ambient drift is limited to sparkle and wand loops; the equalizer, status light, and artwork glow activate only while audio is playing. `prefers-reduced-motion` removes loops, smooth scrolling, and long transitions without hiding content.

## Interaction states

- Entry action: modal-style gate with immediate, keyboard-focusable entry; it never starts audio.
- Playback: semantic play/pause controls drive the authorized 30-second preview with real progress, accurate status copy, and no autoplay.
- Charm navigation: semantic anchor links with labels, visible focus, and at least `44px` targets.
- Visual archive: click/tap cards open an accessible enlarged dialog; mobile browsing works through a horizontal list.
- Booking/social: visible `mailto:` and external links remain available without animation.

## Content and replacement points

Site content is in `src/data/site.ts`; the verified music identifiers and destinations are centralized in `src/lib/music-config.ts`. Archive entries, shows, booking details, socials, and asset paths can be replaced without editing presentation components. Show data, booking address, social destinations, and archive artwork remain explicitly provisional.

## Official music preview

Apple&apos;s iTunes Search API provides the official remote preview stream and release metadata; the Pixie Player remains the entirely original visual and interaction layer. “Pixiedust” by Pixiekitty is the configured preview track, selected only after exact artist and track validation. The route and browser both use the original Apple preview URL, and no audio file is downloaded, proxied, cached, or stored in the repository.

The source can later be replaced with an authorized master or custom preview supplied by the artist. That change should preserve the same player-state contract and visible attribution requirements while updating the centralized music configuration and server lookup.

## Asset inventory

See [ASSETS.md](./ASSETS.md) for source paths, derived files, intended use, and known licensing information.
