---
name: Nguyen Quang Truong Portfolio
description: Tactile cut-paper architecture and precision scroll mechanics for a PHP & Rust systems engineer
colors:
  primary: "#b8332a"
  primary-hover: "#8f241d"
  primary-wash: "#f5e4e1"
  secondary-patina: "#2b5b4e"
  secondary-patina-wash: "#e1ece8"
  tertiary-ochre: "#8e6119"
  tertiary-ochre-press: "#ddb05c"
  canvas-rag: "#efece4"
  sheet-alabaster: "#f9f7f1"
  sheet-recessed: "#e5e0d5"
  sheet-deep: "#d8d1c3"
  press-pine: "#1a1d1a"
  press-raised: "#232823"
  press-well: "#121512"
  ink-walnut: "#181715"
  ink-graphite: "#49453e"
  ink-caption: "#615c53"
  ink-bone: "#f4f0e6"
  ink-ash: "#b5b0a4"
  rule-bevel: "#cfc8b8"
  rule-drafting: "#9e9686"
  focus-ring: "#1f5c6e"
typography:
  display:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.1vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.2vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body-lead:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Chivo Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "8px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.sheet-alabaster}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-paper:
    backgroundColor: "{colors.sheet-alabaster}"
    textColor: "{colors.ink-walnut}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-ink:
    backgroundColor: "{colors.ink-walnut}"
    textColor: "{colors.sheet-alabaster}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  card-folio:
    backgroundColor: "{colors.sheet-alabaster}"
    textColor: "{colors.ink-walnut}"
    rounded: "{rounded.md}"
    padding: "28px"
  input-field:
    backgroundColor: "{colors.sheet-alabaster}"
    textColor: "{colors.ink-walnut}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: Nguyen Quang Truong Portfolio

## Overview

**Creative North Star: "The Kinetic Paper Atelier"**

This system joins the physical honesty of layered architectural matboard and patent drawing sheets with the responsive spring physics of native desktop tools. Built specifically for PHP/Laravel backend engineer and SmoothScroll creator Nguyễn Quang Trường, every surface behaves like cut museum stock or an inked letterpress plate: recessed wells hold interactive 3D and live physics instruments, while stacked chamfered folios organize real system architectures without fabricated screenshots.

It explicitly rejects neon purple-cyan SaaS dark modes, decorative glassmorphism, uniform Bento card grids, and flat unifferentiated cream résumés. Contrast between raw cotton-rag daylight galleries and a committed deep pine-walnut press bed paces the journey from first impression through technical proof to correspondence.

**Key Characteristics:**
- Multi-ply cut-paper relief combining raised alabaster sheets, recessed matboard apertures, and subtle static cotton-fiber grain.
- A committed dark botanical pine-walnut press bed separating narrative philosophy and technical capability plates from light folio sheets.
- Expressive metal-type display serif (`Brygada 1918`) paired with Vietnamese-native geometric prose (`Be Vietnam Pro`) and drafting monospace (`Chivo Mono`).
- Meaningful spatial choreography: a Three.js 3D strata & rotor model, a pinned horizontal folio rail, and React 19 `<ViewTransition>` shared-element morphs with paper-shutter reveals.

## Colors

Pigments are drawn from printmaking inks, archival matboard stock, and machined brass rather than synthetic screen primaries, with every foreground/background pair verified at or above WCAG AA contrast.

### Primary
- **Cinnabar Seal Vermilion**: Reserved for primary calls to action, active folio index tabs, SmoothScroll's live spring trace, and patent-sheet inspection callouts. White-alabaster labels on vermilion and vermilion accents on alabaster both clear 5.8:1 contrast.

### Secondary
- **Mineral Pine Patina**: Encodes verified engineering roles, live system availability indicators, and operational badges across light and press-plate zones.

### Tertiary
- **Raw Escapement Ochre**: Marks active capability plate indices on the dark letterpress bed and machined hub accents in the 3D rotor sculpture.

### Neutral
- **Raw Cotton Rag**: Primary page ground carrying subtle static paper fiber texture.
- **Alabaster Cut-Sheet**: Topmost die-cut folio cards, interactive buttons, and form fields.
- **Recessed Matboard Well**: Carved apertures framing the 3D stage, live physics lab, and interactive pipeline schematics.
- **Deep Pine-Walnut Press**: Committed dark architectural zone housing the About narrative and three Capability plates.
- **Dense Carbon-Walnut & Archival Graphite**: Primary and secondary reading inks tuned for extended bilingual legibility.

### Named Rules
**The Single Seal Rule.** Cinnabar Seal Vermilion marks only the active point of commitment or live motion trace in any viewport; peer controls stay in walnut ink or alabaster stock so hierarchy is immediate.

**The Whole-Zone Plate Rule.** Dark surfaces commit across an entire full-bleed press section (`#about` and `#skills`) rather than scattering isolated dark cards across a light page.

## Typography

**Display Font:** Brygada 1918 (with Georgia, serif fallback)
**Body Font:** Be Vietnam Pro (with system-ui, sans-serif fallback)
**Label/Mono Font:** Chivo Mono (with ui-monospace, monospace fallback)

**Character:** Sculptural interwar printshop serif headlines bring editorial gravity, while Vietnamese-native geometric prose and crisp drafting monospace keep dense architectural specifications effortless to scan in both Vietnamese and English.

### Hierarchy
- **Display** (500, `clamp(2.5rem, 5.1vw, 5.25rem)`, 1.03): Hero thesis statement and full-dossier project titles.
- **Headline** (500, `clamp(2.1rem, 4.2vw, 3.75rem)`, 1.08): Primary section headings across light and dark zones.
- **Title** (500, `1.5rem`–`2.25rem`, 1.12): Project folio titles, capability plate headings, and employer names.
- **Body** (400, `1rem`, 1.65): Narrative prose, project summaries, and engineering deliverables capped at 54–65ch.
- **Label** (500, `0.7rem`–`0.75rem`, `0.04em` tracking): Figure codes (`FIG. I`), pipeline node tags, timestamps, and tabular telemetry (`tabular-nums`).

### Named Rules
**The Self-Standing Heading Rule.** Headings never carry a stacked uppercase kicker or eyebrow above them; figure numbers and metadata sit in an adjacent margin column or separated top registration strip.

**The Native Diacritic Rule.** Every loaded typeface ships full native Vietnamese glyphs (`latin-ext` and `vietnamese` subsets), eliminating browser weight synthesis and fallback ransom-note rendering.

## Layout

Content aligns to a `1340px` maximum container (`min(100% - 3rem, 1340px)` on desktop, `min(100% - 2rem, 1340px)` below `640px`) built on a 12-column asymmetric grid.
- **First Viewport (`#hero`):** `min-h-[calc(100svh-4.125rem)]` pairing a 7-column typographic thesis and chamfered proof seal against a 5-column recessed 3D model well.
- **Pinned Horizontal Folio Rail (`#projects`):** On viewports `>= 1024px` with motion enabled, vertical scroll drives a `315vh` sticky exhibition stage translating four `960px` folio sheets horizontally; below `1024px` or under `prefers-reduced-motion`, the exact same DOM track stacks vertically with zero horizontal overflow.
- **Press-Plate Unfold (`#about` + `#skills`):** Enters with a scroll-linked `clip-path` inset expansion into full-bleed dark letterpress territory.
- **Sticky Stacked Career Sheets (`#experience`):** Chronological employer folios stack via progressive `position: sticky` offsets (`5.5rem`, `7rem`).

## Elevation & Depth

Depth is physical and structural, modeled after multi-ply museum matboard rather than diffuse SaaS drop shadows or blur filters. Raised sheets cast tight contact shadows paired with stacked deckle edges, while interactive instruments sit inside carved inset wells.

### Shadow Vocabulary
- **Raised Cut-Sheet** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.85), 0 2px 4px rgba(24,23,21,0.055), 0 12px 28px -10px rgba(24,23,21,0.11)`): Standard elevated cards and repository tiles.
- **Stacked Folio Ply** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.88), 0 3px 0 -1px #e5e0d5, 0 3px 0 0 #cfc8b8, 0 7px 0 -2px #efece4, 0 7px 0 -1px #cfc8b8, 0 16px 32px -12px rgba(24,23,21,0.14)`): Primary project folios, career ledger sheets, and correspondence dispatch frame.
- **Recessed Paper Well** (`box-shadow: inset 0 2px 6px rgba(24,23,21,0.085), inset 0 1px 1px rgba(24,23,21,0.06), 0 1px 0 rgba(255,255,255,0.7)`): Carved apertures holding the 3D rotor stage and pipeline schematics.

### Named Rules
**The Honest Relief Rule.** Elevation always corresponds to physical layer order: wells recede into darker matboard (`#e5e0d5`), primary reading sheets rise into alabaster (`#f9f7f1`), and zero-blur cartoon block shadows are never used.

## Shapes

Corners stay architectural and crisp (`2px` badges, `3px` controls, `4px` wells) contrasted with deliberate 45-degree chamfered paper cuts (`clip-path: polygon(...)` with 6 clean vertices) on major folio sheets. Borders are `1px` solid bevel rules (`#cfc8b8` on light stock, `#353b35` on dark press plates).

## Components

### Buttons
- **Shape:** Crisp cut-corner rectangle (`3px` radius) with minimum `44px`–`48px` touch height.
- **Primary:** Cinnabar Vermilion fill with alabaster label; darkens on hover and scales to `0.97` on `:active` (`150ms ease-out`).
- **Hover / Focus:** Explicit property transitions (`background-color, color, border-color, transform`); `2px` solid mineral focus ring offset by `3px`.
- **Secondary / Paper / Ink:** Raised alabaster stock with `1px` drafting rule, or dense walnut-ink fill that shifts to vermilion on hover.

### Chips
- **Style:** `2px` radius drafting stamps in `Chivo Mono` (`0.68rem`–`0.75rem`) with `1px` cut-rule borders on raw cotton-rag ground.
- **State:** Static stack identifiers remain neutral; interactive pipeline nodes highlight with a vermilion border and raised alabaster fill when inspected.

### Cards / Containers
- **Corner Style:** `4px` radius or 6-vertex architectural `paper-chamfer` diagonal corner cuts on major folios.
- **Background:** Alabaster cut-sheet on light grounds; raised pine-charcoal (`#232823`) on the press plate.
- **Shadow Strategy:** Stacked Folio Ply on primary artifacts; Raised Cut-Sheet on repository and pagination tiles.
- **Border:** `1px solid` bevel rule.
- **Internal Padding:** `20px`–`40px` responsive scale.

### Inputs / Fields
- **Style:** `1px` strong drafting border (`#9e9686`) over alabaster stock (`3px` radius) with subtle inset top shadow and `16px` (`1rem`) minimum font size to prevent mobile browser zoom.
- **Focus:** Vermilion border paired with `2px` mineral teal focus outline.
- **Error / Disabled:** Crimson alert banner with `role="alert"` and `50%` opacity disabled state.

### Navigation
- **Style:** Solid cotton-rag sticky header (`viewTransitionName: site-header`) anchored at `z-index: 100` with a live `2px` vermilion scroll-progress bar along its bottom rule, active section underlines, `VI / EN` toggle, and Escape-dismissible mobile drawer (`overscroll-behavior: contain`).

### Interactive 3D & Physics Instruments
- **3D Cut-Paper Rotor (`PaperKineticSculpture`):** Three.js extruded matboard strata + brass/vermilion escapement rotor responding to pointer parallax, wheel impulses, and explode/stratum toggles, backed by an immediate layered SVG relief fallback.
- **Live Wheel-Impulse Comparator (`SmoothScrollLab`):** High-DPI `<canvas>` oscilloscope plotting stepped Win32 wheel notches against SmoothScroll's continuous spring curve across three damping presets.

## Do's and Don'ts

### Do:
- **Do** pair every cross-route project link with `transitionTypes` (`folio-forward` or `folio-back`) and a unique `<ViewTransition name>` so shared-element morphs and paper-shutter reveals stay synchronized.
- **Do** keep all claims, metrics (`30,000+` user-reported SmoothScroll downloads), and source links strictly grounded in verified CV and repository facts, omitting public repo links for proprietary enterprise work.
- **Do** gate pointer hover motion behind `@media (hover: hover) and (pointer: fine)` and collapse spatial motion cleanly under `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** place uppercase eyebrows or kickers above `h1`, `h2`, or `h3` headings.
- **Don't** introduce purple/indigo/cyan neon glows, decorative `backdrop-filter` glass cards, gradient text, or `transition: all`.
- **Don't** duplicate named `<ViewTransition>` boundaries simultaneously in hidden desktop/mobile DOM branches.
