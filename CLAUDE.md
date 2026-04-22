# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- No test script configured; add Jest/Vitest if testing is required.

## Project Architecture

### File Structure
- `app/` - Next.js App Router
  - `layout.tsx` - Root layout with font providers, metadata, and language context
  - `page.tsx` - Home page importing sections and layout components
  - `globals.css` - Global CSS including Tailwind directives
  - `favicon.ico` - Site favicon
- `components/` - Reusable UI components organized by concern:
  - `layout/` - Navbar, Footer, LocaleHandler, SectionWrapper
  - `sections/` - Hero, About, Skills, Experience, Projects, Contact sections
  - `animations/` - ScrollProgress, FadeIn animations
  - `ui/` - Primitive UI elements (Button, Card, InputField, TechBadge, GlassCard)
  - `3d/` - Three.js powered CodeOrb component
- `i18n/` - Internationalization setup (LanguageContext)
- `public/` - Static assets
- `styles/` - (None currently; styling via Tailwind and globals.css)

### Styling
- Tailwind CSS v4 configured via `tailwindcss` and `@tailwindcss/postcss`
- Custom CSS in `globals.css` for base styles and utility layers
- Font optimization using `next/font` (Playfair Display, Inter, JetBrains Mono)

### State & i18n
- Language context in `i18n/LanguageContext.tsx` for toggling between English/Vietnamese
- LocaleHandler component detects and applies user locale preference

### Dependencies
- React 19, Next.js 16.2.4 (App Router)
- Three.js ecosystem (`@react-three/fiber`, `@react-three/drei`) for 3D elements
- Framer Motion for animations
- Lucide React for icons
- TypeScript for type safety

## Important Notes

⚠️ **Next.js Version**: This project uses Next.js 16.2.4 with the App Router, which has breaking changes from older versions. Consult the official Next.js documentation in `node_modules/next/dist/docs/` before implementing features.

## Code Guidelines
- Follow existing patterns in `components/ui/` for primitive components
- Section components should be self-contained and import only from `@/components/*`
- Use `next/image` for optimized images (currently not used; consider for future)
- Keep animations in `components/animations/` using Framer Motion or CSS
- For 3D scenes, extend `components/3d/CodeOrb.tsx` following the same pattern

## Deployment
- Deploy to Vercel using `vercel` CLI or Git integration (see README)
- Environment variables can be added to `.env.local` (not committed)
