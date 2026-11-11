# Portfolio Design System

## Direction

**The Quiet Craft** is an editorial portfolio for a PHP engineer. It uses considered typography, an asymmetric 12-column grid, generous spacing, and fine rules to make real work easy to read. The page keeps one paper-toned theme throughout. The written brief is the visual reference; no Recto image or authentic project screenshots were present in the workspace.

The design does not use gradients, glass effects, generic stock imagery, fake product screenshots, decorative status dots, or repeated cards. Project entries use their verified descriptions, technologies, dates, and source links.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F8F7F2` | Page background |
| Ivory | `#FCFBF8` | Inputs and light surfaces |
| Ink | `#191815` | Headings and primary text |
| Muted | `#625E56` | Supporting text |
| Hairline | `#D8D4CB` | Dividers and borders |
| Rust | `#A64738` | Links, focus accents, and primary action |
| Olive | `#6D715E` | Reserved secondary accent |
| Focus | `#315F8A` | Keyboard focus ring |

Rust is the only decorative accent. Olive is reserved for muted copy and technical metadata. Body copy uses Ink or Muted on Paper; primary actions use Ivory on Rust.

## Type

- **Newsreader** for display and section headings.
- **DM Sans** for prose, navigation, and controls.
- **IBM Plex Mono** for dates, labels, and technology metadata.
- Fonts use `next/font`; Latin and Latin Extended subsets cover Vietnamese characters.
- Display headings use tight leading and restrained italic emphasis. Body text uses a 65–70 character measure and 1.6 line height.
- The hero display scales from 44px to 96px. UI labels remain at readable sizes.

## Layout

- Content maximum width: 1320px, with 12 columns from desktop through wide screens.
- Mobile uses a single column and 16px side gutters; tablet and desktop use 24–48px gutters.
- Sections are separated with a single hairline and 80–128px vertical rhythm.
- Project and experience entries use editorial rows with dates, role, description, and technology metadata.
- Cards are reserved for controls that need a distinct surface, such as form fields and primary actions.

## Page structure

1. Sticky navigation and language switch.
2. Hero with name, role, location, concise positioning, project link, and CV preview.
3. Selected projects, with verified dates and public source links only.
4. About and education.
5. Technical capabilities, grouped by actual engineering work.
6. Experience and personal projects, newest first.
7. Public GitHub repositories with live loading, error, and empty states.
8. Contact details and the EmailJS form with a mailto fallback.
9. Compact footer with section links and social destinations.

The home route is `/`. `/portfolio` permanently redirects to `/`. Existing section anchors remain available: `#hero`, `#projects`, `#about`, `#skills`, `#experience`, `#open-source`, and `#contact`. Notes are omitted because there are no published notes. Individual case-study routes are omitted until verified context, outcomes, and learnings are available.

## Interaction and accessibility

- Navigation uses normal anchors and native smooth scrolling. The mobile menu closes on Escape, outside click, or link activation.
- Language selection remains stored in local storage and a same-site cookie; the document language follows the selected language.
- CV preview uses a native modal dialog with keyboard dismissal and a direct PDF download.
- The contact form reports success only after EmailJS confirms delivery. The mailto path explains that the user's mail app should open instead of reporting a send success.
- GitHub data comes from the public REST API and is cached in local storage for one hour. No GitHub token is sent from the browser.
- Focus indicators, semantic headings, labelled inputs, 44px controls, and reduced-motion handling are required.
- Motion is limited to short opacity and position reveals, control feedback, and simple color transitions. No animation is needed to reveal essential information.

## Content and evidence

- Project and experience copy is based on the latest supplied CV and verified public links.
- Penalty Co. experience is dated April to September 2026. C3TEK is dated February 2025 to April 2026. SmoothScroll begins May 2026.
- The property platform has no verified public repository, so it has no project source link.
- SmoothScroll, the medical booking system, and ChatBot links were confirmed as public repositories.
- The 30,000+ SmoothScroll download figure is reported in the supplied CV and has not been independently audited.
- No other business results, user counts, or project screenshots are inferred.

## Implementation

Design tokens and base rules live in `app/globals.css`; font loading and metadata live in `app/layout.tsx`. Section components own their content and use the shared `SectionWrapper`, `SectionTitle`, `FadeIn`, and `Button` components. All page copy is provided in English and Vietnamese through `i18n/dictionary.ts` or localized section data.
