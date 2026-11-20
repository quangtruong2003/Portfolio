# Design System — The Kinetic Studio Monograph

## Aesthetic World (Replacement World)

**The Kinetic Studio Monograph** replaces the earlier warm-paper/vermilion letterpress theme with a bespoke visual identity grounded directly in Nguyễn Quang Trường's authentic portrait and dual engineering craft:

1. **Daylight Gallery Surface (`#F5F6F3` / `#FFFFFF`):** Crisp, calm studio stone inspired by architectural monographs and precision hardware documentation — framing Trường's natural studio portrait in a deep forest-green overshirt without artificial framing chrome, tilting, or floating text clutter.
2. **Deep Forest-Obsidian Engine Room (`#0F1713`):** The unseen backend & systems layer (`#about`, `#skills`, the live `120 Hz SmoothScroll` oscilloscope, and the live GitHub Releases telemetry console), derived directly from the deep pine tone of his overshirt so the person and the product feel genuinely unified.
3. **Zero AI-Slop Discipline:** No cream-and-terracotta defaults, no uppercase eyebrows above headings, no decorative `01 / 02 / 03` section numbers, no nested card boxes, no custom cursor, no instructional user hints, and no 315vh scroll-jacking.

## Color Tokens

- **Daylight Surfaces:** `--surface-ground: #F5F6F3`, `--surface-elevated: #FFFFFF`, `--surface-subtle: #EAEDE7`, `--border-subtle: #D7DCD3`, `--border-strong: #9AA397`, `--border-input: #7C877A`
- **Daylight Ink:** `--ink-primary: #111714`, `--ink-secondary: #3F4A43`, `--ink-muted: #556159` (all ≥ 4.5:1 AA)
- **Engine Room Surfaces:** `--engine-ground: #0F1713`, `--engine-surface: #16211B`, `--engine-inset: #0A100D`, `--engine-border: #28382F`, `--engine-ink: #F3F6F2`, `--engine-muted: #A9B8AE`
- **Primary Brand Accent (Forest Pine):** `--accent-primary: #194A38`, `--accent-primary-hover: #12372A`, `--accent-primary-soft: #E4EFE9`, `--accent-on-engine: #68D3A4`
- **Kinetic Telemetry Accent (Rust Signal):** `--signal-rust: #B8421F`, `--signal-rust-soft: #FAEAE4`, `--signal-on-engine: #F39567` (strictly for SmoothScroll 120 Hz physics traces & live release metrics)

## Typography (100% Vietnamese-Native `next/font/google`)

- **Display / Headings:** `Bricolage Grotesque` (`vietnamese` subset, weights `400–700`, `text-wrap: balance`, unitless `line-height` `1.03–1.12`)
- **UI & Body:** `Be Vietnam Pro` (`vietnamese` subset, weights `400–700`, `text-wrap: pretty`, `1rem` base, `1.6` line-height, `64ch` max measure)
- **Telemetry / Code / Versions Only:** `IBM Plex Mono` (`vietnamese` subset, `tabular-nums` on dynamic counters)

## Motion & Mobile-Native Architecture

- **Curves:** `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1)`, `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`.
- **Authored Moments:** (1) One non-uniform compositor-only Hero wave entrance + calm optical studio softbox depth on portrait; (2) Real-time 120 Hz SmoothScroll spring-vs-Win32 canvas monitor & velocity-sensitive capability ribbon; (3) React 19 `<ViewTransition>` shared-element morph into `/projects/[slug]` + two-layer Forest-Obsidian `100dvh` full-screen mobile navigation curtain.
- **Tactile Feedback & Mobile Native:** `enabled:active:scale-[0.96]` (150ms), `100svh` hero, `100dvh` mobile menu & CV modal, `viewport-fit=cover` safe areas, `16px` form inputs, `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent`, pointer-gated `:hover`, and full `prefers-reduced-motion` support.
