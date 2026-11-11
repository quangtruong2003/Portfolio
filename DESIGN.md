# Portfolio Design System

## Approved direction

**Hybrid Art Direction** combines an editorial reading experience with evidence from real engineering work. The site should feel personal and considered while making the PHP/Laravel focus and the SmoothScroll product easy to understand.

The palette stays light to support long-form reading. Rust is the only accent. Process diagrams are built from verified project details; they are explanations, not product screenshots or measured performance charts.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | #F5F2EA | Main background |
| Ivory | #FCFBF8 | Form controls |
| Ink | #191815 | Headings and primary copy |
| Muted | #625E56 | Supporting copy |
| Hairline | #D8D4CB | Dividers |
| Rust | #A64738 | Links, CTA, and selected emphasis |
| Diagram surface | #E9E7DF | Project process diagrams |
| Focus | #315F8A | Visible keyboard focus |

## Typography

- Newsreader for display and section headings.
- DM Sans for prose, navigation, and controls.
- IBM Plex Mono for technical metadata and dates.
- All fonts load through next/font; Latin Extended supports Vietnamese.
- Headlines stay concise. Body copy stays readable at mobile widths.
- Avoid decorative uppercase labels on every section.

## Layout and composition

- Keep the 1320px content maximum and 12-column desktop grid.
- Stack the hero until 1024px; do not compress the project proof column at tablet sizes.
- Use different structures for the spotlight project, work list, capabilities, timeline, and repository list.
- Use rules and spacing to establish hierarchy. Avoid repeated cards and borders around every item.
- Keep all current section anchors: #hero, #projects, #about, #skills, #experience, #open-source, and #contact.
- /portfolio remains a permanent redirect to /.

## Page structure

1. Sticky navigation, language switch, and skip link.
2. Hero that states PHP backend work and gives one verified product proof.
3. SmoothScroll spotlight with an honest process diagram.
4. Additional project work with source links where public.
5. About and education.
6. Three capability groups.
7. Employment timeline.
8. Curated public repositories with loading, retry, and empty states.
9. Contact details and the EmailJS form.
10. Compact footer with section links and social destinations.

## Content and evidence

- Use the latest supplied CV and existing project copy as the source of claims.
- SmoothScroll's 30,000+ download figure is user-reported and has not been independently audited.
- Do not invent client outcomes, throughput, performance numbers, user counts, or product screenshots.
- Keep the property platform project source link omitted because no verified public repository is available.
- Keep public repository links for SmoothScroll, the medical booking system, and ChatBot.

## Interaction and accessibility

- Use ordinary anchor navigation and one scroll offset for the sticky header.
- Mobile navigation closes on Escape, outside click, or link activation without swallowing the underlying click.
- The document language follows the EN/VI selection.
- CV preview uses a native dialog with keyboard dismissal and a direct PDF download.
- Forms retain labels, native validation, and distinct success/error/fallback states.
- Motion is limited to control feedback and short section emphasis. Reduced-motion users see essential content immediately.
- Preserve visible focus, semantic headings, labelled form fields, and at least 44px interactive targets.

## Implementation

- Design tokens and responsive base rules live in app/globals.css.
- Font loading and metadata live in app/layout.tsx.
- Existing section components remain the main content modules.
- Project workflow diagrams use semantic HTML and CSS, not simulated product UI.
- Do not reintroduce the old public/images/image.png hero mockup; its displayed statistics and content are stale.
