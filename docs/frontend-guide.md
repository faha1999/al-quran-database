# Frontend Guide

The Quran Developer Platform's documentation and landing page are built using **Next.js 16** and **React 19**, focusing on performance and a premium aesthetic.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Design System

### Visual Language

The project uses a dark-themed, modern aesthetic characterized by:

- **Liquid Glassmorphism**: High-blur background elements with semi-transparent borders (e.g., in `aside` and navigation elements).
- **Vibrant Accents**: Primary color is a curated Blue (`#3b82f6`) used for highlights and interactive states.
- **Typography**: Uses the Inter font family for high legibility across all devices.

### Components

- **Server Components**: Used for all static documentation content to minimize client-side JavaScript.
- **Client Components**: Used for interactive elements such as search filters, API previews, and animations.
- **Atomic Primitives**: Reusable UI components (e.g., `ApiCard`, `CodeBlock`, `SearchInput`) are located in `components/`.

## Animations

Framer Motion is used for subtle micro-animations to enhance user engagement:

- **Hover Transitions**: Smooth border and background color changes on cards and navigation links.
- **Entry Animations**: Subtle fade-in effects for content sections.
- **Interactive Feedback**: Dynamic scaling or shifts for active buttons and filters.

## Accessibility (A11y)

- **Semantic HTML**: Core docs and search pages use semantic containers such as `<nav>`, `<aside>`, and `<main>`.
- **Visible Focus States**: Interactive controls include visible focus/hover treatments in the shipped UI.
- **Current Status**: No dedicated accessibility audit or compliance certification is documented yet.

## Responsive Strategy

Current layouts use responsive grids and spacing scales for docs, landing, and search pages.

- **Docs Layout**: Two-column layout on large screens with stacked content on smaller screens.
- **Search UI**: Controls and result cards wrap across narrow viewports.
- **Current Status**: No separate mobile audit artifact is committed yet.
